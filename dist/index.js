"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.























enable = enable;exports.




disable = disable;exports.



warn = warn;exports.



log = log;exports.



error = error;exports.



json = json;exports.





enabled = enabled;var _path = require("path");var _path2 = _interopRequireDefault(_path);var _chalk = require("chalk");var _chalk2 = _interopRequireDefault(_chalk);var _stackTrace = require("stack-trace");var _stackTrace2 = _interopRequireDefault(_stackTrace);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var defaultOpts = { printLine: true };var debugEnabled = false;var opts = defaultOpts;function sharedLog(msg) {if (debugEnabled) {var trace = _stackTrace2.default.get()[2];var line = trace.getLineNumber();var file = _path2.default.basename(trace.getFileName());var loggedMsg = opts.printLine ? _chalk2.default.grey("[" + file + ":" + line + "] ") : "";loggedMsg += msg;console.log(loggedMsg);}}function enable() {var passedOpts = arguments.length <= 0 || arguments[0] === undefined ? defaultOpts : arguments[0];debugEnabled = true;opts = passedOpts;}function disable() {debugEnabled = false;}function warn(msg) {sharedLog(_chalk2.default.yellow(msg));}function log(msg) {sharedLog(_chalk2.default.cyan(msg));}function error(msg) {sharedLog(_chalk2.default.red(msg));}function json(obj) {if (debugEnabled) {console.log(obj);}}function enabled() {
    return debugEnabled;}