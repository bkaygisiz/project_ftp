import { createConnection } from 'net';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function connect(host, port) {
    const client = createConnection(port, host, () => {
        console.log('connected to server');
        rl.question('ftp@' + host + ':' + port + ": ", function(command) {
            client.write(command);
        })
        client.on('data', (data) => {
            console.log(data.toString() + typeof(data));
            rl.question('ftp@' + host + ':' + port + "$", function(command) {
                client.write(command);
            })
        })
    })
}