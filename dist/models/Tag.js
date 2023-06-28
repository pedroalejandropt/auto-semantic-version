"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
class Tag {
    constructor(label) {
        this.isRelease = () => this.Label.toLowerCase().includes('release');
        this.destructureTag = () => {
            return this.Label.replace('v', '').split('.').map(x => Number(x));
        };
        this.Label = label;
    }
}
exports.Tag = Tag;
