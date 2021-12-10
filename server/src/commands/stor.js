import fs from 'fs';

export function stor(argument, c) {
    cmd = "STOR";
    file = argument;
    console.log(cmd + " file = " + file);
    c.write('Send me');
}

export function start_Copy(c, data) {
    wstream = fs.createWriteStream(file);
    wstream.write(data);
    wstream.on('finish', () => {
        console.log('ended');
    })
}