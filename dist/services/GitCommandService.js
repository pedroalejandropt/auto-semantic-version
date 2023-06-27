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
        let line = (release) ?
            `git tag --list "*release*" --format='%(refname:short)' | sed '$!s/$/|||/'` :
            `git tag --list --format='%(refname:short)' | sed '$!s/$/|||/'`;
        let result = (await (0, ExecCommand_1.cmd)(line));
        let label = (await (0, ExecCommand_1.cmd)(line)).split('|||').pop();
        if (!label) {
            label = result;
        }
        console.log(label);
        console.log(result);
        return new Tag_1.Tag(label);
    }
}
exports.GitCommandService = GitCommandService;
