import { useAuth } from '@/composables/useAuth';

export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useAuth();

    // Handle guest users
    if (to.meta.auth === 'guest') {
      // If a guest tries to access a guest page and is authenticated, redirect them to the dashboard
      if (user.value) {
        return navigateTo('/dashboard');
      }
      // Allow guest users without a token to access the page
      return;
    }

    console.log(to)
  
    // Handle authenticated users (if `auth` is not false)
    if (to.meta.auth !== false) {
        // If the page requires authentication and the user is not authenticated, redirect to the login page
        if (!user.value) {
            return navigateTo('/');
        }
      // If the user is authenticated and the page is protected, allow access
      return;
    }
  
    // Default behavior: If the page does not require authentication, allow access
    return;
  });