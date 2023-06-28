"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = void 0;
class Version {
    constructor(major, minor, patch) {
        this.get = () => `v${this.Major}.${this.Minor}.${this.Patch}`;
        this.Major = major;
        this.Minor = minor;
        this.Patch = patch;
    }
}
exports.Version = Version;
