"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = exports.getCommits = void 0;
const ExecCommand_1 = require("./ExecCommand");
const getCommits = async () => {
    let line = 'git log --pretty=oneline';
    let output = (await (0, ExecCommand_1.cmd)(line)).trim();
    console.log('COMMITS ' + output);
};
exports.getCommits = getCommits;
const getTags = async () => {
    let line = 'git tag -l';
    let output = (await (0, ExecCommand_1.cmd)(line)).trim();
    console.log('TAGS ' + output);
};
exports.getTags = getTags;
