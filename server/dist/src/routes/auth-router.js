"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieProps = exports.p = void 0;
const auth_service_1 = __importDefault(require("@services/auth-service"));
const errors_1 = require("@shared/errors");
const express_1 = require("express");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// Constants
const router = (0, express_1.Router)();
const { OK } = http_status_codes_1.default;
// Paths
exports.p = {
    login: '/login',
    logout: '/logout',
};
// Cookie Properties
exports.cookieProps = Object.freeze({
    key: 'ExpressGeneratorTs',
    secret: process.env.COOKIE_SECRET,
    options: {
        httpOnly: true,
        signed: true,
        path: (process.env.COOKIE_PATH),
        maxAge: Number(process.env.COOKIE_EXP),
        domain: (process.env.COOKIE_DOMAIN),
        secure: (process.env.SECURE_COOKIE === 'true'),
    },
});
/**
 * Login a user.
 */
router.post(exports.p.login, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check email and password present
    const { email, password } = req.body;
    if (!(email && password)) {
        throw new errors_1.ParamMissingError();
    }
    // Get jwt
    const jwt = yield auth_service_1.default.login(email, password);
    // Add jwt to cookie
    const { key, options } = exports.cookieProps;
    res.cookie(key, jwt, options);
    // Return
    return res.status(OK).end();
}));
/**
 * Logout the user.
 */
router.get(exports.p.logout, (_, res) => {
    const { key, options } = exports.cookieProps;
    res.clearCookie(key, options);
    return res.status(OK).end();
});
// Export router
exports.default = router;
