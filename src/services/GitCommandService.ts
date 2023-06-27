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
        let line = 'git log -1 --pretty=format:"&$& %H ||| %s"'
        let [hash, msg] = (await cmd(line)).split('|||');
        return new Commit(hash, msg)
    }

    async getTags() : Promise<Tag[]> {
        let line = 'git tag -l --pretty=format:"&$& %H ||| %s"';
        let output = (await cmd(line)).split('&$&');
        let tags = output.map(() => new Tag())
        return tags;
    }

    async getLastTag() : Promise<Tag> {
        let line = 'git tag -l -1 --pretty=format:"&$& %H ||| %s"';
        let output = (await cmd(line)).split('|||');
        return new Tag();
    }
}