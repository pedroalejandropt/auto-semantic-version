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
        return this.Label.replace('v', '').split('.').map(x => Number(x));
    }
}