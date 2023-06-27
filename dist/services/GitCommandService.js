"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitCommandService = void 0;
const ExecCommand_1 = require("../helpers/ExecCommand");
const Commit_1 = require("../models/Commit");
const Tag_1 = require("../models/Tag");
class GitCommandService {
    async getCommits() {
        let line = 'git log --pretty=format:"&$& %H ||| %s"';
        let output = (await (0, ExecCommand_1.cmd)(line)).split('&$&');
        let commits = output.map((commit) => {
            let [hash, msg] = commit.split('|||');
            return new Commit_1.Commit(hash, msg);
        });
        return commits;
    }
    async getLastCommit() {
        let line = 'git log -1 --pretty=format:"%H ||| %s"';
        let [hash, msg] = (await (0, ExecCommand_1.cmd)(line)).split('|||');
        return new Commit_1.Commit(hash, msg);
    }
    async getTags() {
        let line = `git tag --list --format='%(refname:short)' | sed '$!s/$/|||/'`;
        let output = (await (0, ExecCommand_1.cmd)(line)).split('|||');
        let tags = output.map((label) => new Tag_1.Tag(label));
        return tags;
    }
    async getLastTag(release = false) {
        let label = '';
        let line = (release) ?
            'git tag -l "*release*"' :
            'git tag -l';
        let tags = (await (0, ExecCommand_1.cmd)(line)).split('\n');
        if (tags.length > 0) {
            tags.pop();
            label = tags.pop();
        }
        return new Tag_1.Tag(label);
    }
}
exports.GitCommandService = GitCommandService;
