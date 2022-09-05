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
exports.authMw = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_router_1 = require("@routes/auth-router");
const jwt_util_1 = __importDefault(require("@util/jwt-util"));
// Constants
const { UNAUTHORIZED } = http_status_codes_1.default;
const jwtNotPresentErr = 'JWT not present in signed cookie.';
/**
 * Middleware to verify if user is an admin.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
function authMw(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get json-web-token
            const jwt = req.signedCookies[auth_router_1.cookieProps.key];
            if (!jwt) {
                throw Error(jwtNotPresentErr);
            }
            // Make sure user role is an admin
            const clientData = yield jwt_util_1.default.decode(jwt);
            if (!!clientData) {
                res.locals.sessionUser = clientData;
                next();
            }
            else {
                throw Error(jwtNotPresentErr);
            }
        }
        catch (err) {
            return res.status(UNAUTHORIZED).json({
                error: err.message,
            });
        }
    });
}
exports.authMw = authMw;
;
