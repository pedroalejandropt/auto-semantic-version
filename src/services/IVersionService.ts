import { Tag } from '../models/Tag';
import { Version } from '../models/Version'

export interface IVersionService {
    buildVersion() : Promise<Version>;
    increaseVersion(tag: Tag) : Version;
}