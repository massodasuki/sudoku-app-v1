"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const supertest_1 = __importDefault(require("supertest"));
const _server_1 = __importDefault(require("@server"));
const user_repo_1 = __importDefault(require("@repos/user-repo"));
const user_model_1 = __importStar(require("@models/user-model"));
const auth_router_1 = require("@routes/auth-router");
const functions_1 = require("@shared/functions");
const login_agent_1 = require("spec/support/login-agent");
const errors_1 = require("@shared/errors");
describe('auth-router', () => {
    const authPath = '/api/auth';
    const loginPath = `${authPath}${auth_router_1.p.login}`;
    const logoutPath = `${authPath}${auth_router_1.p.logout}`;
    const { BAD_REQUEST, OK, UNAUTHORIZED } = http_status_codes_1.default;
    let agent;
    beforeAll((done) => {
        agent = supertest_1.default.agent(_server_1.default);
        done();
    });
    describe(`"POST:${loginPath}"`, () => {
        const callApi = (reqBody) => {
            return agent.post(loginPath).type('form').send(reqBody);
        };
        it(`should return a response with a status of ${OK} and a cookie with a jwt if the login
            was successful.`, (done) => {
            // Setup Dummy Data
            const creds = {
                email: 'jsmith@gmail.com',
                password: 'Password@1',
            };
            const role = user_model_1.UserRoles.Standard;
            const pwdHash = hashPwd(creds.password);
            const loginUser = user_model_1.default.new('john smith', creds.email, role, pwdHash);
            spyOn(user_repo_1.default, 'getOne').and.returnValue(Promise.resolve(loginUser));
            // Call API
            callApi(creds)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(OK);
                expect(res.headers['set-cookie'][0]).toContain(auth_router_1.cookieProps.key);
                done();
            });
        });
        it(`should return a response with a status of ${UNAUTHORIZED} and a json with the error
            "${errors_1.UnauthorizedError.Msg}" if the email was not found.`, (done) => {
            // Setup Dummy Data
            const creds = {
                email: 'jsmith@gmail.com',
                password: 'Password@1',
            };
            spyOn(user_repo_1.default, 'getOne').and.returnValue(Promise.resolve(null));
            // Call API
            callApi(creds)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(UNAUTHORIZED);
                expect(res.body.error).toBe(errors_1.UnauthorizedError.Msg);
                done();
            });
        });
        it(`should return a response with a status of ${UNAUTHORIZED} and a json with the error
            "${errors_1.UnauthorizedError.Msg}" if the password failed.`, (done) => {
            // Setup Dummy Data
            const creds = {
                email: 'jsmith@gmail.com',
                password: 'someBadPassword',
            };
            const role = user_model_1.UserRoles.Standard;
            const pwdHash = hashPwd('Password@1');
            const loginUser = user_model_1.default.new('john smith', creds.email, role, pwdHash);
            spyOn(user_repo_1.default, 'getOne').and.returnValue(Promise.resolve(loginUser));
            // Call API
            callApi(creds)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(UNAUTHORIZED);
                expect(res.body.error).toBe(errors_1.UnauthorizedError.Msg);
                done();
            });
        });
        it(`should return a response with a status of ${BAD_REQUEST} and a json with an error
            for all other bad responses.`, (done) => {
            // Setup Dummy Data
            const creds = {
                email: 'jsmith@gmail.com',
                password: 'someBadPassword',
            };
            spyOn(user_repo_1.default, 'getOne').and.throwError('Database query failed.');
            // Call API
            callApi(creds)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBeTruthy();
                done();
            });
        });
    });
    describe(`"GET:${logoutPath}"`, () => {
        it(`should return a response with a status of ${OK}.`, (done) => {
            agent.get(logoutPath)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(OK);
                done();
            });
        });
    });
    function hashPwd(pwd) {
        return bcrypt_1.default.hashSync(pwd, login_agent_1.pwdSaltRounds);
    }
});
