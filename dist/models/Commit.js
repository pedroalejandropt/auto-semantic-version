"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commit = void 0;
class Commit {
    constructor(hash, msg) {
        this.IsMajor = () => this.Msg.toLowerCase().includes('major');
        this.IsMinor = () => this.Msg.toLowerCase().includes('minor');
        this.Hash = hash;
        this.Msg = msg;
    }
}
exports.Commit = Commit;
