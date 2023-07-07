"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitCommandService = void 0;
const Tag_1 = require("../models/Tag");
const Commit_1 = require("../models/Commit");
const ExecCommand_1 = require("../helpers/ExecCommand");
const core = require('@actions/core');
class GitCommandService {
    async getCommits() {
        let line = 'git log --pretty=format:"&$& %H|||%s"';
        let output = (await (0, ExecCommand_1.cmd)(line)).split('&$&');
        let commits = output.filter(c => c != '').map((commit) => {
            let [hash, msg] = commit.split('|||');
            return new Commit_1.Commit(hash, msg);
        });
        return commits;
    }
    async getLastCommit() {
        let line = 'git log -1 --pretty=format:"%H|||%s"';
        let [hash, msg] = (await (0, ExecCommand_1.cmd)(line)).split('|||');
        return new Commit_1.Commit(hash, msg);
    }
    async getTags() {
        let line = `git tag --list --format="%(refname:short)|||"`;
        let output = (await (0, ExecCommand_1.cmd)(line)).split('|||');
        let tags = output.filter(t => t != '').map((label) => new Tag_1.Tag(label));
        return tags;
    }
    async getLastTag() {
        const release = core.getInput('release');
        const namespace = core.getInput('namespace');
        let label = '';
        let line = (release && namespace) ?
            `git tag -l "*${namespace}-${release}*"` :
            (release) ?
                `git tag -l "*[0-9]-${release}"` :
                (namespace) ?
                    `git tag -l "*[0-9]-${namespace}"` :
                    'git tag -l "*[0-9]"';
        let tags = (await (0, ExecCommand_1.cmd)(line)).split('\n');
        if (tags.length > 1) {
            tags.pop();
            label = tags.pop();
        }
        else {
            label = 'v0.0.0';
        }
        return new Tag_1.Tag(label);
    }
}
exports.GitCommandService = GitCommandService;
