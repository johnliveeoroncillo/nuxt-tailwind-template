export default defineEventHandler(async (event) => {
    console.log('Request from: ', event.path, event.method);
})
