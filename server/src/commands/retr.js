import fs from 'fs';

export function retr(argument, c) {
    let read = fs.createReadStream(argument);
    read.on('data', data => {
        c.write(data);
    })
    return 0;
}