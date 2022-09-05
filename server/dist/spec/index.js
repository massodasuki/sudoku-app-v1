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
require("./loadEnv");
const find_1 = __importDefault(require("find"));
const jasmine_1 = __importDefault(require("jasmine"));
const command_line_args_1 = __importDefault(require("command-line-args"));
const jet_logger_1 = __importDefault(require("jet-logger"));
// Setup command line options
const options = (0, command_line_args_1.default)([
    {
        name: 'testFile',
        alias: 'f',
        type: String,
    },
]);
// Init Jasmine
const jasmine = new jasmine_1.default();
jasmine.exitOnCompletion = false;
// Set location of test files
jasmine.loadConfig({
    random: true,
    spec_dir: 'spec',
    spec_files: [
        './tests/**/*.spec.ts',
    ],
    stopSpecOnExpectationFailure: false,
});
// Run all or a single unit-test
let execResp;
if (options.testFile) {
    const testFile = options.testFile;
    find_1.default.file(testFile + '.spec.ts', './spec', (files) => {
        if (files.length === 1) {
            jasmine.specFiles = [files[0]];
            jasmine.execute();
        }
        else {
            jet_logger_1.default.err('Test file not found!');
        }
    });
}
else {
    execResp = jasmine.execute();
}
// Finish
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!!execResp) {
        const info = yield execResp;
        if (info.overallStatus === 'passed') {
            jet_logger_1.default.info('All tests have passed :)');
        }
        else {
            jet_logger_1.default.err('At least one test has failed :(');
        }
    }
}))();
