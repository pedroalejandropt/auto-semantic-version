"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require('@actions/core');
const GitCommand_1 = require("./helpers/GitCommand");
async function run() {
    try {
        (0, GitCommand_1.getCommits)();
        (0, GitCommand_1.getTags)();
        core.setOutput('previousTags', '');
        core.setOutput('lastCommit', '');
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
run();
