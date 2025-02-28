// composables/useApi.ts
import { toast } from 'vue-sonner'
import type { ObjectLiteral, Response } from './composables.interface';
import { RequestMethods } from './composables.enums';
import { useGlobalStore } from '~/stores';

interface ApiResponse<T> {
    apiData?: Response<T> | null;
    apiError?: Response<unknown>;
    paramError?: Record<string, string>;
}

export const useApi = () => {
    const request = async <T>(url: string, method: RequestMethods, payload?: ObjectLiteral): Promise<ApiResponse<T>> => {
        console.log('Requesting data...', url);

        try {
            const env = useRuntimeConfig();
            const { SSR } = env.public;

            let finalUrl = `/api${url}`;
            const config: any = {
                method,
                withCredentials: true,
                headers: {
                    'x-socket-id': useGlobalStore().socketId,
                }
            }

            if (!SSR) {
                config.baseURL = env.public.API_URL;
                finalUrl = url;
            }

            if (payload && method === RequestMethods.GET) {
                config.query = payload;
            } else if (payload) {
                config.body = JSON.parse(JSON.stringify(payload));
            }
            const response = await $fetch<Response<T>>(finalUrl, config);
            return { apiData: response };
        } catch (error: any) {
            console.log('Error requesting data...', error);
            // Handle errors
            if (error.data) {
                const statusCode = error.statusCode;

                if (statusCode === 401) {
                    console.error('Unauthorized...');
                    useAuth().clearAuth();
                    if (import.meta.client) {
                        window.location.reload();
                    }
                    return { apiError: error.data };
                }

                const data = error.data;
                // Handle parameter errors
                if (statusCode === 422 && data.data) {
                    return { apiError: data, paramError: data.data };
                }
        
                // Show toast if an error occurred
                toast.error(data.message, {
                    class: '!bg-red-600 !text-white',
                });
                return { apiError: data };
            }
        
            return { apiError: error.data };
        }
    }

    const GET = async <T>(url: string, params?: ObjectLiteral): Promise<ApiResponse<T>> => {
        console.log('Fetching data...', url);
        return await request<T>(url, RequestMethods.GET, params );
    }

    const POST = async <T>(url: string, payload?: ObjectLiteral): Promise<ApiResponse<T>> => {
        return await request<T>(url, RequestMethods.POST, payload);
    }

    const PUT = async <T>(url: string, payload?: ObjectLiteral): Promise<ApiResponse<T>> => {   
        return await request<T>(url, RequestMethods.PUT, payload);
    }

    const DELETE = async <T>(url: string, payload?: ObjectLiteral): Promise<ApiResponse<T>> => {
        return await request<T>(url, RequestMethods.DELETE, payload);
    }

    const FILE = async (url: string): Promise<any> => {
        console.log('Requesting file...', url);


        try {
            const fetch = new Promise(async (resolve, reject) => {
                try {
                    const getFileTypeFromHeaders = (headers: any) => {
                        const contentType = headers.get('Content-Type');
                        return contentType ? contentType.split(';')[0] : null; // Extract the part before any semicolon
                    };

                    const getFileNameFromHeaders = (headers: any, headerName: string) => {
                        const contentDisposition = headers.get(headerName);
                        return contentDisposition ? contentDisposition.split('filename=')[1] : null;
                    };

                    const response = await $fetch<any>(`/api${url}`, {
                        method: RequestMethods.GET,
                        responseType: 'blob',
                        headers: {
                            'x-socket-id': useGlobalStore().socketId,
                        },
                        onResponse: ({ response }: any) => {
                            console.log('Response...', response);
                            const fileType = getFileTypeFromHeaders(response.headers);
                            const fileName = getFileNameFromHeaders(response.headers, 'Content-Disposition');
                            const fileResponse = window.URL.createObjectURL(new Blob([response._data as Blob])); // Access _data
                            resolve({ data: { data: fileResponse, type: fileType, filename: fileName.replace(/"/g, '') }, error: null }); // Resolve the promise
                        },
                    });
                    return { data: response ?? null, error: null };
                } catch (error) {
                    reject({ data: null, error: error });
                }
            });

            const { data, error } = await fetch;

            if (!data) {
                return { data: null, error: error };
            }

            return { data: { data: data.data, type: data.type, filename: data.filename }, error: null };
        } catch (error: any) {
            console.log('Error requesting file...', error);
            return { data: null, error: error };
        }
    }

    return { GET, POST, PUT, DELETE, FILE };
};
