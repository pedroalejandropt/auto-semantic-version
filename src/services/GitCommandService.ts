import { Tag } from '../models/Tag';
import { Commit } from '../models/Commit';
import { cmd } from '../helpers/ExecCommand'
import { IGitCommandService } from './IGitCommandService';

const core = require('@actions/core');

export class GitCommandService implements IGitCommandService {
    
    async getCommits() : Promise<Commit[]> {
        let line = 'git log --pretty=format:"&$& %H|||%s"'
        let output = (await cmd(line)).split('&$&');
        let commits = output.filter(c => c != '').map((commit) => {
            let [hash, msg] = commit.split('|||');
            return new Commit(hash, msg)
        });
        return commits;
    }

    async getLastCommit() : Promise<Commit> {
        let line = 'git log -1 --pretty=format:"%H|||%s"'
        let [hash, msg] = (await cmd(line)).split('|||');
        return new Commit(hash, msg)
    }

    async getTags() : Promise<Tag[]> {
        let line = `git tag --list --format="%(refname:short)|||"`;
        let output = (await cmd(line)).split('|||');
        let tags = output.filter(t => t != '').map((label) => new Tag(label))
        return tags;
    }

    async getLastTag() : Promise<Tag> {
        const release = core.getInput('release');
        const namespace = core.getInput('namespace');
        let label = '';
        let line = 
            (release && namespace) ? 
                `git tag -l "*${namespace}-${release}*"` : 
            (release) ?
                `git tag -l "*[0-9]-${release}"` : 
            (namespace) ?
                `git tag -l "*[0-9]-${namespace}"` :
            'git tag -l "*[0-9]"';
        
        let tags = (await cmd(line)).split('\n');
        if (tags.length > 1){
            tags.pop();
            label = tags.pop();
        } else {
            label = 'v0.0.0'
        }
        
        return new Tag(label);
    }
}