"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commit = void 0;
class Commit {
    constructor(hash, msg) {
        this.getType = () => this.isMajor() ? 'major' : this.isMinor() ? 'minor' : 'patch';
        this.isMajor = () => this.Msg.toLowerCase().includes('major');
        this.isMinor = () => this.Msg.toLowerCase().includes('minor');
        this.Hash = hash;
        this.Msg = msg;
    }
}
exports.Commit = Commit;
