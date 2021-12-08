import { createServer } from 'net';
import fs from 'fs';
let commands = JSON.parse(fs.readFileSync('commands.json'));
let helps = JSON.parse(fs.readFileSync('help.json'));
commands.USER = user;
commands.PASS = pass;
commands.LIST = list;
commands.CWD = cwd;
commands.PWD = pwd;
commands.HELP = help;
let users = JSON.parse(fs.readFileSync('users.json'));
let currentUser = "";

export function launch(host, port) {
    const server = createServer({host: host}, (c) => {
        c.write('220 Connexion established');
        c.on('data', (data) => {
            let dataSplit = data.toString().split(' ');
            switch(dataSplit[0]) {
                case 'RETR':
                    let read = fs.createReadStream(dataSplit[1]);
                    read.on('data', (data) => {
                        c.write(data);
                    })
                    break;
                case 'STOR':
                    break;
                default:
                    c.write(check(dataSplit[0], dataSplit[1]));
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

function check(command, argument) {
    if (command in commands) {
        if(argument)
            return(commands[command](argument));
        return(commands[command]());
    }
    else {
        return('502 command doesn exists');
    }
}

function user(username) {
    if(username in users) {
        currentUser = username;
        return("331 User exists waiting for pwd");
    }
    return("User does not exists");
}

function pass(password) {
    if (users[currentUser] == password)
        return("230 authentification succeeded");
    return("430 Authentification failed, wrong ids");
}

function list() {
    let files = fs.readdirSync(process.cwd());
    let finalStr = "";
    files.forEach((file) => {
        finalStr += file + '\n';
    })
    return (finalStr);
}

function cwd(path) {
    try {
        process.chdir(path);
        return(process.cwd());
    }
    catch (e) {
        return(e.toString());
    }
}

function pwd() {
    return (process.cwd());
}

function help() {
    let val = JSON.stringify(helps).split(',');
    let str = "";
    val.forEach((line) => {
        str += line + "\n"
    })
    return str;
}