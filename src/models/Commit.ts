export class Commit {
    
    constructor(
        hash: string,
        msg: string
    )
    {
        this.Hash = hash;
        this.Msg = msg;
    }

    Hash: string;
    Msg: string;

    getType = () : string => this.isMajor() ? 'major' : this.isMinor() ? 'minor' : 'patch';
    isMajor = () : boolean => this.Msg.toLowerCase().includes('major');
    isMinor = () : boolean => this.Msg.toLowerCase().includes('minor');
}