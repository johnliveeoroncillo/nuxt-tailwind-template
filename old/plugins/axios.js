import { v4 } from "uuid";

export default function({ $axios, app }) {
    // YOU CAN DYNAMIC HEADERS TO THIS SECTION
    $axios.onRequest(config => {
        config.headers.common['x-request-id'] = v4();
        return config;
    })

    $axios.onError(error => {
        if ($axios.isCancel(error)) {
            console.error('Request canceled', error)
            return Promise.reject(error);
        } else {
            const status = error.response ? error.response.status : 500;
            if (status === 401) { // IF UNAUTHORIZED PUSH TO ANOTHER URL
                app.$auth.logout(); // ADDITIONAL CHECKS TO LOGOUT
                return app.router.push('/');
            }
            const err = error.response ? error.response.data : { message: 'Unknown error encountered', error };
            return Promise.reject(err);
        }
    })
}