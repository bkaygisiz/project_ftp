import { createServer } from 'net';
import fs from 'fs';
import { user } from './commands/user';
import { pass } from './commands/pass';
import { list } from './commands/list';
import { cwd } from './commands/cwd';
import { pwd } from './commands/pwd';
import { help } from './commands/help';
import { retr } from './commands/retr';
import { stor } from './commands/stor';
import { start_Copy } from './commands/stor';
let commands = JSON.parse(fs.readFileSync('commands.json'));
commands.USER = user;
commands.PASS = pass;
commands.LIST = list;
commands.CWD = cwd;
commands.PWD = pwd;
commands.HELP = help;
commands.RETR = retr;
commands.STOR = stor;

let currentUser = "";
let cmd = "";
let file = "";
let wstream;

export function launch(host, port) {
    const server = createServer({ host: host }, (c) => {
        c.write('220 Connexion established');
        c.on('data', (data) => {
            if(cmd == "STOR") {
                start_Copy(c, data);
            }
            else {
                let dataSplit = data.toString().split(' ');
                let val = check(dataSplit[0], dataSplit[1], c);
                if (typeof val === 'string') {
                    c.write(val);
                }
            }
        })
        c.on('end', () => {
            console.log('client disconected');
        })
    })

    server.listen(port, () => {
        console.log('server listening on ' + port);
    })
}

function check(command, argument, c) {
    if (command in commands) {
        if (argument)
            return (commands[command](argument, c));
        return (commands[command]());
    }
    else {
        return ('502 command doesn exists');
    }
}