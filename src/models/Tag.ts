const core = require('@actions/core');

export class Tag {

    constructor(
        label: string
    ) 
    {
        this.Label = label;
    }

    Label: string;
    
    isRelease = () => this.Label.toLowerCase().includes('release');

    destructureTag = (): number[] => {
        const release = core.getInput('release');
        const namespace = core.getInput('namespace');

        let label = this.Label.replace('v', '');
        if (release) 
            label = label.replace(`-${release}`, '');
        
        if (namespace)
            label = label.replace(`-${namespace}`, '');

        return label.split('.').map(x => Number(x));
    }
}