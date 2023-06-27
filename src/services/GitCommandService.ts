import { cmd } from '../helpers/ExecCommand'
import { Commit } from '../models/Commit';
import { Tag } from '../models/Tag';
import { IGitCommandService } from './IGitCommandService';

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

    async getLastTag(release: boolean = false) : Promise<Tag> {
        let line = (release) ? 
            'git tag --list "*release*" --format="%(refname:short)" | sed "$!s/$/|||/"' : 
            'git tag --list --format="%(refname:short)" | sed "$!s/$/|||/"' ;
        console.log(line);
        
        let result = (await cmd(line));
        console.log(result);
        let label = result.split('|||').pop();
        if (label == '') {
            label = result
        }
        console.log(label);
        console.log(typeof label);
        
        return new Tag(label);
    }
}