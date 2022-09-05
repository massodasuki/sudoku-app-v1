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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repo_1 = __importDefault(require("@repos/user-repo"));
const jwt_util_1 = __importDefault(require("@util/jwt-util"));
const errors_1 = require("@shared/errors");
/**
 * Login()
 *
 * @param email
 * @param password
 * @returns
 */
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // Fetch user
        const user = yield user_repo_1.default.getOne(email);
        if (!user) {
            throw new errors_1.UnauthorizedError();
        }
        // Check password
        const pwdPassed = yield bcrypt_1.default.compare(password, user.pwdHash);
        if (!pwdPassed) {
            throw new errors_1.UnauthorizedError();
        }
        // Setup Admin Cookie
        return jwt_util_1.default.sign({
            id: user.id,
            email: user.name,
            name: user.name,
            role: user.role,
        });
    });
}
// Export default
exports.default = {
    login,
};
