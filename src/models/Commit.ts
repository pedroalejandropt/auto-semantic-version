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
    
    IsMajor = () : boolean => this.Msg.toLowerCase().includes('major');
    IsMinor = () : boolean => this.Msg.toLowerCase().includes('minor');
}