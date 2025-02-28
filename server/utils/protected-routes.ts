/**
 * List down all protected endpoints
 */
const protectedRoutes = [
    'update-profile/[id]'
]

export const checkProtectedPage = async (event: any) => {
    const parsedPath = event.path.replace(/\/api\//g, '');

    for (const route of protectedRoutes) {
        // Replace [id] with a regular expression pattern
        const regexPattern = route.replace(/\[.*?\]/g, '[^/]+');
        const regex = new RegExp(`^${regexPattern}$`);

        if (regex.test(parsedPath)) {
            return true; // Match found
        }
    }

    return false; // No match found
}