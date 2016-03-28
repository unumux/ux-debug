import path from "path";

import chalk from "chalk";
import stackTrace from "stack-trace";

let defaultOpts = {
    printLine: true
};

let debugEnabled = false;
let opts = defaultOpts;

function sharedLog(msg) {
    if(debugEnabled) {
        let trace = stackTrace.get()[2];
        let line = trace.getLineNumber();
        let file = path.basename(trace.getFileName());

        let loggedMsg = opts.printLine ? chalk.grey(`[${file}:${line}] `) : "";
        loggedMsg += msg;
        console.log(loggedMsg);
    }
}

export function enable(passedOpts = defaultOpts) {
    debugEnabled = true;
    opts = passedOpts;
}

export function disable() {
    debugEnabled = false;
}

export function warn(msg) {
    sharedLog(chalk.yellow(msg));
}

export function log(msg) {
    sharedLog(chalk.cyan(msg));
}

export function error(msg) {
    sharedLog(chalk.red(msg));
}

export function json(obj) {
    if(debugEnabled) {
        console.log(obj);
    }
}

export function time() {
    if(debugEnabled) {
        console.time.apply(console, arguments);
    }
}

export function timeEnd() {
    if(debugEnabled) {
        console.timeEnd.apply(console, arguments);
    }
}

export function enabled() {
    return debugEnabled;
}
