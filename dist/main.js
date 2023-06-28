"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require('@actions/core');
const VersionService_1 = require("./services/VersionService");
async function run() {
    try {
        let versionService = new VersionService_1.VersionService();
        let version = await versionService.buildVersion();
        console.log(version);
        console.log(version.get());
        core.setOutput('version', version.get());
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
run();
