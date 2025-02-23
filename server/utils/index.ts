import { readFileSync } from "fs";
import { join } from "path";

const loadProtected = async () => {
    try {
        const filePath = join(process.cwd(), 'server', 'middleware', 'protected.json');
        const protect = readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(protect);
        return jsonData;
    } catch (error) {
        console.error('Error reading protected.json:', error);
    }
}

export const checkProtectedPage = async (event: any) => {
    const protectedRoutes = await loadProtected();
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