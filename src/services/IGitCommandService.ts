import { Commit } from '../models/Commit'
import { Tag } from '../models/Tag'

export interface IGitCommandService {
    getCommits() : Promise<Commit[]> ;
    getLastCommit() : Promise<Commit> ;
    getTags() : Promise<Tag[]> ;
    getLastTag() : Promise<Tag> ;
}