export class Version {

    constructor(
        major: number,
        minor: number,
        patch: number
    ) 
    {
        this.Major = major;
        this.Minor = minor;
        this.Patch = patch;
    }

    Major: number;
    Minor: number;
    Patch: number;
    
    get = () : string => `v${this.Major}.${this.Minor}.${this.Patch}`
}