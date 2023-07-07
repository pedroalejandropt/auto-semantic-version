import { Tag } from '../models/Tag';
import { Version } from '../models/Version';
import { IVersionService } from './IVersionService';
import { GitCommandService } from './GitCommandService';

export class VersionService implements IVersionService {

    _gitCommandService: GitCommandService;
    
    constructor() {
        this._gitCommandService = new GitCommandService();
    }
    
    async buildVersion() : Promise<Version> {
        let tag = await this._gitCommandService.getLastTag();
        let newVersion = await this.increaseVersion(tag);
        
        return newVersion;
    }

    increaseVersion = async (tag: Tag) : Promise<Version> => {
        let commit = (await this._gitCommandService.getLastCommit()).getType();
        
        let [major, minor, patch] =  tag.destructureTag(); 

        switch (commit) {
            case 'major':
                major += 1;
                minor = 0;
                patch = 0;
                break;
            case 'minor':
                minor += 1;
                patch = 0;
                break;
            default:
                patch += 1;
                break;
        }

        return new Version(major, minor, patch);
    }

}