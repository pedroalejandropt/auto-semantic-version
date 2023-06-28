const core = require('@actions/core');
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
    
    get = () : string => {
        const release = core.getInput('release');
        const namespace = core.getInput('namespace');

        let label = `v${this.Major}.${this.Minor}.${this.Patch}`
        
        if (namespace)
            label = `${label}-${namespace}`;

        if (release) 
            label = `${label}-${release}`;

        return label;
    }
}