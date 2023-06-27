import * as exec from '@actions/exec';

const cmd = async (command: string, ...args: any) => {
    let results = '';
    let errors = '';

    const options = {
        silent: true,
        listeners: {
            stdout: (data: any) => { results += data.toString(); },
            stderr: (data: any) => { errors += data.toString(); },
            ignoreReturnCode: true,
            silent: true
        }
    };

    await exec.exec(command, args, options);
    
    return results;
}

export { cmd }