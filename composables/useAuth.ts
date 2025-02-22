import type { ObjectLiteral } from "./composables.interface";
import Cookies from "js-cookie";  // Import js-cookie
import { useUserStore } from "@/stores/auth";
import { useApi } from "./useApi";

export function useAuth() {
    /**
     * @deprecated
     * As the setting of cookie is now done in the server side
    */
    const token = ref('');
    const userStore = useUserStore();
    const user = ref(userStore.user);
    const api = useApi();
    /**
     * @deprecated
     * As the setting of cookie is now done in the server side
     * @param tokens 
     */
    const setToken = (tokens: string) => {
        token.value = tokens;
        Cookies.set("cloudcarelabs", tokens, { expires: 1, secure: process.env.NODE_ENV === "production" });
    }

    const setUser = (data: ObjectLiteral) => {
        userStore.setUser(data ?? null);
    }

    /**
     * @deprecated
     * As the setting of cookie is now done in the server side
     * @returns 
     */
    // Get token from cookies if not already set in ref
    const getToken = (): string | undefined => {
        if (!token.value) {
            token.value = Cookies.get("cloudcarelabs") || '';
        }
        return token.value || undefined;
    };

    // Clear authentication (useful for logout)
    const clearAuth = async () => {
        token.value = '';
        userStore.setUser(null);
        Cookies.remove("cloudcarelabs");

        await api.DELETE('/portal/logout');
    };


    return {
        setToken,
        getToken,  // Provide a getter for the token
        setUser,
        clearAuth,
        token,
        user,
    };
}
