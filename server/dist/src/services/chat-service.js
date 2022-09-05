"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitMessage = exports.connectSocketToRm = void 0;
// Constants
const socketRoomName = 'jet-logger-chat-room';
/**
 * Connect to socket room.
 *
 * @param socket
 * @returns
 */
function connectSocketToRm(socket) {
    socket.leave(socketRoomName);
    socket.join(socketRoomName);
}
exports.connectSocketToRm = connectSocketToRm;
/**
 * Send a chat message.
 *
 * @param socket
 * @param message
 * @param senderName
 * @returns
 */
function emitMessage(socket, message, senderName) {
    // Send a message to the room
    const room = socket.to(socketRoomName);
    room.emit('emit-msg', {
        timestamp: Date.now(),
        content: message,
        senderName,
    });
}
exports.emitMessage = emitMessage;
// Export default
exports.default = {
    connectSocketToRm,
    emitMessage
};
