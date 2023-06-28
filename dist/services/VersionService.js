"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionService = void 0;
const Version_1 = require("../models/Version");
const GitCommandService_1 = require("./GitCommandService");
class VersionService {
    constructor() {
        this.increaseVersion = (tag) => {
            let commitType = '';
            let [major, minor, patch] = tag.destructureTag();
            switch (commitType) {
                case 'major':
                    major += 1;
                    break;
                case 'minor':
                    minor += 1;
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
        let newVersion = this.increaseVersion(tag);
        return newVersion;
    }
}
exports.VersionService = VersionService;
