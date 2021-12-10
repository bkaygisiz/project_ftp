import fs from 'fs';

export function list() {
    let files = fs.readdirSync(process.cwd());
    let finalStr = "";
    files.forEach((file) => {
        finalStr += file + '\n';
    })
    return (finalStr);
}