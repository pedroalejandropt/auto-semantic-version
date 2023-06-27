"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
class Tag {
    constructor(label) {
        this.IsRelease = () => this.Label.toLowerCase().includes('release');
        this.Label = label;
    }
}
exports.Tag = Tag;
