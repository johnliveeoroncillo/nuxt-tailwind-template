export default defineEventHandler(async (event) => {
    deleteCookie(event, process.env?.TOKEN_NAME ?? 'token');

    return ResponseHandler.Ok();
})
