import { io } from "socket.io-client";
import { useGlobalStore } from "~/stores";
export const socket = io();

socket.on('connect', () => {
    console.log('Client socket', socket.id);
    useGlobalStore().socketId = socket?.id ?? '';
})
// LIST DOWN SOCKET LISTENERS
socket.on('message', (data) => {
    console.log('socket io client', data);
})