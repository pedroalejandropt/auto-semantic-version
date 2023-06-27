"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmd = void 0;
const exec = require("@actions/exec");
const cmd = async (command, ...args) => {
    let results = '';
    let errors = '';
    const options = {
        silent: true,
        listeners: {
            stdout: (data) => { results += data.toString(); },
            stderr: (data) => { errors += data.toString(); },
            ignoreReturnCode: true,
            silent: true
        }
    };
    await exec.exec(command, args, options);
    return results;
};
exports.cmd = cmd;
