"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
    port: process.env.PORT || 8000,
};
exports.default = config;
