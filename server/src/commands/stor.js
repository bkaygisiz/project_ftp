export let fileName = "";
import { file } from '../server';
export let cmd_val = "";
import fs from 'fs';

export function stor(argument, c) {
    cmd_val = "STOR";
    fileName = argument;
    c.write('Send me');
}

export function start_Copy(c, data) {
    let wstream = fs.createWriteStream(file);
    wstream.write(data);
    wstream.on('finish', () => {
        console.log('ended');
    })
}