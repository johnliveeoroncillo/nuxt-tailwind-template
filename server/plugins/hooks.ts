// import type { H3Event } from 'h3'; // Import H3Event and HttpErrors

// export default defineNitroPlugin((nitroApp) => {
//     nitroApp.hooks.hook('beforeResponse', (event: H3Event) => {
//         if (!event.node.req.complete) {
//             event.node.res.statusCode = 404;
//             event.node.res.end('Not found');
//             return false;  // Prevent further processing of the request
//         }
//     })
// })
