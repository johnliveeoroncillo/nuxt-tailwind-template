export default defineEventHandler(async (event) => {
    clearCookie(process.env?.TOKEN_NAME ?? 'token');
})
