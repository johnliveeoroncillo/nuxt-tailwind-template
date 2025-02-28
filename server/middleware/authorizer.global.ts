import { Token } from "../lib/token";

// Example token decoding function (replace with your actual logic)
function decodeToken(token: string) {
    // Your token decoding logic here
    // Example (using a placeholder):
    if (token === 'test') {
        return { id: 123, username: 'exampleUser' };
    }
    return null;
}

export default defineEventHandler(async (event) => {
    const isProtected = await checkProtectedPage(event);
    if (!isProtected) {
        return;
    }

    // const token = getHeader(event, 'authorization');
    const token = getCookie(event, process.env?.TOKEN_NAME ?? 'token');
    if (!token) {
        return ResponseHandler.Unauthorized();
    }

    const user = Token.verify(token);
    if (user) {
        event.context.user = user;
        console.log("user data set to event.context")
    }
});