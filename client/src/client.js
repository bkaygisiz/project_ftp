import { createConnection } from 'net';
import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let wstream;

export function connect(host, port) {
    const client = createConnection(port, host, () => {
        console.log('connected to server');
        rl.question('ftp@' + host + ':' + port + ": ", function(command) {
            client.write(command);
        })
        client.on('data', (data) => {
            if (data.toString().split(':::')[0] == "COPY") {
                wstream = fs.createWriteStream(data.toString().split(':::')[1]);
                wstream.write(data.toString().split(':::')[2]);
                wstream.end();
            }
            else {
                console.log(data.toString());
            }
            rl.question('ftp@' + host + ':' + port + ": ", function(command) {
                client.write(command);
            })
        })
    })
}