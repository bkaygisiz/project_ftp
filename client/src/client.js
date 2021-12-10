import { createConnection } from 'net';
import readline from 'readline';
import fs from 'fs';
import { CLIENT_RENEG_WINDOW } from 'tls';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let wstream;
let cmd = "";
let arg = ""

export function connect(host, port) {
    const client = createConnection(port, host, () => {
        console.log('connected to server');
        rl.question('ftp@' + host + ':' + port + ": ", function(command) {
            client.write(command);
            cmd = command.split(' ')[0];
            arg = command.split(' ')[1];
        })
        client.on('data', (data) => {
            if (cmd == "RETR") {
                wstream = fs.createWriteStream(arg);
                wstream.write(data);
                cmd = "";
            }
            else if (cmd == "STOR") {
                let read = fs.createReadStream(arg);
                read.on("data", (data) => {
                    client.write(data);
                })
                cmd = "";
            }
            else {
                console.log(data.toString());
            }
            rl.question('ftp@' + host + ':' + port + ": ", function(command) {
                client.write(command);
                cmd = command.split(' ')[0];
                arg = command.split(' ')[1];
            })
        })
        client.on('end', () => {
            console.log("221 connection ended");
        })
    })
}