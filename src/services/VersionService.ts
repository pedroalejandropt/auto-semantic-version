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
        console.log(tag.Label);
        
        let newVersion = this.increaseVersion(tag);
        
        return newVersion;
    }

    increaseVersion = (tag: Tag) : Version => {
        let commitType = ''
        let [major, minor, patch] =  tag.destructureTag(); 

        switch (commitType) {
            case 'major':
                major += 1
                break;
            case 'minor':
                minor += 1
            default:
                patch += 1
                break;
        }

        return new Version(major, minor, patch);
    }

}