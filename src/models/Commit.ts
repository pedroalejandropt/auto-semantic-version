export class Commit {
    Hash: string;
    Msg: string;

    constructor(
        hash: string,
        msg: string
    )
    {
        this.Hash = hash;
        this.Msg = msg;
    }
}