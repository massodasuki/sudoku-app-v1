"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("express-async-errors");
const api_1 = __importDefault(require("./routes/api"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const auth_router_1 = require("@routes/auth-router");
const errors_1 = require("@shared/errors");
const config_1 = __importDefault(require("./databases/config"));
const app = (0, express_1.default)();
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(auth_router_1.cookieProps.secret));
// Set native promises as mongoose promise
mongoose_1.default.Promise = global.Promise;
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
if (process.env.NODE_ENV === 'production') {
    app.use((0, helmet_1.default)()); // Security
    mongoose_1.default.connect(config_1.default.mongoURL, (err) => {
        if (err) {
            console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
            throw err;
        }
    });
}
// Add APIs
app.use('/api', api_1.default);
// Error handling
app.use((err, _, res, __) => {
    jet_logger_1.default.err(err, true);
    const status = (err instanceof errors_1.CustomError ? err.HttpStatus : http_status_codes_1.default.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});
/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/
const viewsDir = path_1.default.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticDir));
// Login page
app.get('/', (req, res) => {
    return res.sendFile('login.html', { root: viewsDir });
});
// Users page
app.get('/users', (req, res) => {
    const jwt = req.signedCookies[auth_router_1.cookieProps.key];
    if (!jwt) {
        return res.redirect('/');
    }
    else {
        return res.sendFile('users.html', { root: viewsDir });
    }
});
// Chat page
app.get('/chat', (req, res) => {
    const jwt = req.signedCookies[auth_router_1.cookieProps.key];
    if (!jwt) {
        return res.redirect('/');
    }
    else {
        return res.sendFile('chat.html', { root: viewsDir });
    }
});
app.get('/sudoku', (req, res) => {
    return res.sendFile('sudoku.html', { root: viewsDir });
});
/************************************************************************************
 *                                   Setup Socket.io
 * Tutorial used for this: https://www.valentinog.com/blog/socket-react/
 ***********************************************************************************/
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.sockets.on('connect', () => {
    return app.set('socketio', io);
});
/************************************************************************************
 *                              Export Server
 ***********************************************************************************/
exports.default = server;
