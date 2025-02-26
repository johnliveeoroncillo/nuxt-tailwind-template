import type { AppConfig } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server, Socket } from "socket.io";
import { defineEventHandler } from "h3";

const connectedSockets = new Map<string, Socket>(); // Store connected clients

export default defineNitroPlugin((nitroApp: AppConfig) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on("connection", (socket) => {
      console.log('Client connected:' , socket.id);
      connectedSockets.set(socket.id, socket); // Store the socket

      socket.on('message', (message) => {
          console.log('Message received: ', message);
      })

      socket.on('disconnect', () => {
          console.log('Client disconnect: ', socket.id);
          connectedSockets.delete(socket.id); // Remove from map on disconnect
      })
  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
    },
    websocket: {
      open(peer) {
        // @ts-expect-error private method and property
        engine.prepare(peer._internal.nodeReq);
        // @ts-expect-error private method and property
        engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
      }
    }
  }));

  nitroApp.hooks.hook("custom:send-message", (socketId: string, message: string) => {
      console.log('custom hook received', socketId, message)
      const socket = connectedSockets.get(socketId);
      if (socket) {
          socket.emit("message", message);
      }
  });

  // Attach io to Nitro app for external access
  nitroApp.io = io;
});