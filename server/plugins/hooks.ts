export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('afterResponse', (event) => {
        if (!event.node.req.complete) {
            event.node.res.statusCode = 404;
            event.node.res.end('Not found');
            return false;  // Prevent further processing of the request
        }
    })
})
