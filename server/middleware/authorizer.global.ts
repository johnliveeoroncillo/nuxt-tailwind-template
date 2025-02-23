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
    console.log(isProtected)
    if (!isProtected) {
        return;
    }

    // const token = getHeader(event, 'authorization');
    const token = getCookie(event, 'token');
    if (token) {
        const user = decodeToken(token); // Replace with your token decoding logic
        if (user) {
            event.context.user = user;
            console.log("user data set to event.context")
        } else {
            HttpErrors.Unauthorized();
        }
    } else {
        HttpErrors.Unauthorized();
    }
});