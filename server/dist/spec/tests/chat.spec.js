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
const supertest_1 = __importDefault(require("supertest"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const _server_1 = __importDefault(require("@server"));
const functions_1 = require("@shared/functions");
const chat_router_1 = require("@routes/chat-router");
const login_agent_1 = __importDefault(require("../support/login-agent"));
const errors_1 = require("@shared/errors");
const { BAD_REQUEST, OK } = http_status_codes_1.default;
describe('chat-router', () => {
    const chatPath = '/api/chat';
    const connectSocketRmPath = `${chatPath}${chat_router_1.p.connect}`;
    const emitMessagePath = `${chatPath}${chat_router_1.p.emit}`;
    let agent;
    let socket;
    let jwtCookie = '';
    beforeAll((done) => {
        agent = supertest_1.default.agent(_server_1.default);
        login_agent_1.default.login(agent, (cookie) => {
            const url = agent.get('/').url;
            jwtCookie = cookie;
            socket = (0, socket_io_client_1.default)(url, {
                reconnectionDelay: 0,
                forceNew: true,
            });
            socket.on('connect', () => __awaiter(void 0, void 0, void 0, function* () {
                console.log('socket connected');
                done();
            }));
            socket.on('disconnect', () => {
                console.log('socket disconnected');
            });
        });
    });
    describe(`"GET - ${connectSocketRmPath}"`, () => {
        const callApi = (socketId) => {
            const path = connectSocketRmPath.replace(':socketId', socketId);
            return agent.get(path).set('Cookie', jwtCookie);
        };
        it(`should return a response with a status of "${OK}" if the user successfully connected
            to the socket room`, (done) => {
            // Call api
            callApi(socket.id)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(OK);
                done();
            });
        });
        it(`should return a response with a status of "${errors_1.RoomNotFoundError.HttpStatus}" if the
            user did not connect to the socket room`, (done) => {
            // Call api
            callApi('some-bad-socket-id')
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(errors_1.RoomNotFoundError.HttpStatus);
                expect(res.body.error).toBe(errors_1.RoomNotFoundError.Msg);
                done();
            });
        });
    });
    describe(`"POST - ${emitMessagePath}"`, () => {
        const callApi = (reqBody) => {
            return agent.post(emitMessagePath).set('Cookie', jwtCookie).type('form').send(reqBody);
        };
        it(`should return a response with a status of "${OK}" and the logged-in user's name`, (done) => {
            // Call api
            callApi({
                socketId: socket.id,
                message: 'How are you today?',
            })
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(OK);
                expect(res.body.senderName).toBe(login_agent_1.default.creds.name);
                done();
            });
        });
        it(`should return a response with a status of "${BAD_REQUEST}" and if the send-message 
            request failed.`, (done) => {
            // Call api
            callApi({
                socketId: 'Some bad socket id',
                message: 'How are you today?',
            })
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(errors_1.RoomNotFoundError.HttpStatus);
                expect(res.body.error).toBe(errors_1.RoomNotFoundError.Msg);
                done();
            });
        });
    });
    afterAll((done) => {
        // Cleanup
        if (socket.connected) {
            console.log('socket disconnecting...');
            socket.disconnect();
        }
        else {
            // There will not be a connection unless you have done() in beforeAll, 
            // socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });
});
