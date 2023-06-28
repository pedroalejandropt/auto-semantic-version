import { Tag } from '../models/Tag';
import { Commit } from '../models/Commit';
import { cmd } from '../helpers/ExecCommand'
import { IGitCommandService } from './IGitCommandService';

const core = require('@actions/core');

export class GitCommandService implements IGitCommandService {
    
    async getCommits() : Promise<Commit[]> {
        let line = 'git log --pretty=format:"&$& %H ||| %s"'
        let output = (await cmd(line)).split('&$&');
        let commits = output.map((commit) => {
            let [hash, msg] = commit.split('|||');
            return new Commit(hash, msg)
        });
        return commits;
    }

    async getLastCommit() : Promise<Commit> {
        let line = 'git log -1 --pretty=format:"%H ||| %s"'
        let [hash, msg] = (await cmd(line)).split('|||');
        return new Commit(hash, msg)
    }

    async getTags() : Promise<Tag[]> {
        let line = `git tag --list --format='%(refname:short)' | sed '$!s/$/|||/'`;
        let output = (await cmd(line)).split('|||');
        let tags = output.map((label) => new Tag(label))
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
                `git tag -l "*${release}*"` : 
            (namespace) ?
                `git tag -l "*${namespace}*"` :
            'git tag -l' ;
        
        let tags = (await cmd(line)).split('\n');
        console.log(tags);
        
        
        if (tags.length > 0){
            tags.pop();
            label = tags.pop();
        } else {
            label = 'v0.0.0'
        }
        
        return new Tag(label);
    }
}