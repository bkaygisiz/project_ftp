import fs from 'fs';
export function help() {
    let helps = JSON.parse(fs.readFileSync('help.json'));
    let val = JSON.stringify(helps).split(',');
    let str = "";
    val.forEach((line) => {
        str += line + "\n"
    })
    return str;
}