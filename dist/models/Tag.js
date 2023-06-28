"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const core = require('@actions/core');
class Tag {
    constructor(label) {
        this.isRelease = () => this.Label.toLowerCase().includes('release');
        this.destructureTag = () => {
            const release = core.getInput('release');
            const namespace = core.getInput('namespace');
            let label = this.Label.replace('v', '');
            if (release)
                label = label.replace(`-${release}`, '');
            if (namespace)
                label = label.replace(`-${namespace}`, '');
            return label.split('.').map(x => Number(x));
        };
        this.Label = label;
    }
}
exports.Tag = Tag;
