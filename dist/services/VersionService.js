"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionService = void 0;
const Version_1 = require("../models/Version");
const GitCommandService_1 = require("./GitCommandService");
class VersionService {
    constructor() {
        this.increaseVersion = async (tag) => {
            let commit = (await this._gitCommandService.getLastCommit()).getType();
            let [major, minor, patch] = tag.destructureTag();
            switch (commit) {
                case 'major':
                    major += 1, minor = 0, patch = 0;
                    break;
                case 'minor':
                    minor += 1, patch = 0;
                default:
                    patch += 1;
                    break;
            }
            return new Version_1.Version(major, minor, patch);
        };
        this._gitCommandService = new GitCommandService_1.GitCommandService();
    }
    async buildVersion() {
        let tag = await this._gitCommandService.getLastTag();
        let newVersion = await this.increaseVersion(tag);
        return newVersion;
    }
}
exports.VersionService = VersionService;
