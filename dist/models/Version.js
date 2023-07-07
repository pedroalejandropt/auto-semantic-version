"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = void 0;
const core = require('@actions/core');
class Version {
    constructor(major, minor, patch) {
        this.get = () => {
            const release = core.getInput('release');
            const namespace = core.getInput('namespace');
            let label = `v${this.Major}.${this.Minor}.${this.Patch}`;
            if (namespace)
                label = `${label}-${namespace}`;
            if (release)
                label = `${label}-${release}`;
            return label;
        };
        this.Major = major;
        this.Minor = minor;
        this.Patch = patch;
    }
}
exports.Version = Version;
