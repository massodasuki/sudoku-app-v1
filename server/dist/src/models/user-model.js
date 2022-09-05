"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["Standard"] = 0] = "Standard";
    UserRoles[UserRoles["Admin"] = 1] = "Admin";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
/**
 * Get a new User object.
 *
 * @param name
 * @param email
 * @param role
 * @param pwdHash
 * @returns
 */
function getNew(name, email, role, pwdHash) {
    return {
        id: -1,
        email,
        name,
        role: role !== null && role !== void 0 ? role : UserRoles.Standard,
        pwdHash: pwdHash !== null && pwdHash !== void 0 ? pwdHash : '',
    };
}
/**
 * Copy a user object.
 *
 * @param user
 * @returns
 */
function copy(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        pwdHash: user.pwdHash,
    };
}
// Export default
exports.default = {
    new: getNew,
    copy,
};
