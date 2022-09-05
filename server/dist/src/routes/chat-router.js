"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.p = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = require("express");
const chat_service_1 = __importDefault(require("@services/chat-service"));
const errors_1 = require("@shared/errors");
// Chat router
const router = (0, express_1.Router)();
const { OK } = http_status_codes_1.default;
// Paths
exports.p = {
    connect: '/connect-socket-room/:socketId',
    emit: '/emit-message',
};
/**
 * Connect to socket room.
 */
router.get(exports.p.connect, (req, res) => {
    const { socketId } = req.params;
    // Check params
    if (!socketId) {
        throw new errors_1.ParamMissingError();
    }
    // Get room
    const io = req.app.get('socketio');
    const socket = io.sockets.sockets.get(socketId);
    if (!socket) {
        throw new errors_1.RoomNotFoundError();
    }
    // Connect
    chat_service_1.default.connectSocketToRm(socket);
    // Return
    return res.status(OK).end();
});
/**
 * Send a chat message.
 */
router.post(exports.p.emit, (req, res) => {
    const { sessionUser } = res.locals;
    const { message, socketId } = req.body;
    // Check params
    if (!socketId || !message) {
        throw new errors_1.ParamMissingError();
    }
    // Get room
    const io = req.app.get('socketio');
    const socket = io.sockets.sockets.get(socketId);
    if (!socket) {
        throw new errors_1.RoomNotFoundError();
    }
    // Connect
    chat_service_1.default.emitMessage(socket, message, sessionUser.name);
    // Return
    return res.status(OK).json({
        senderName: sessionUser.name,
    });
});
// Export router
exports.default = router;
