export class Tag {

    constructor(
        label: string
    ) 
    {
        this.Label = label;
    }

    Label: string;
    
    IsRelease = () => this.Label.toLowerCase().includes('release');
}