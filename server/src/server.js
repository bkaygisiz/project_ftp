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
commands.RETR = retr;
commands.STOR = stor;

let users = JSON.parse(fs.readFileSync('users.json'));
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

function user(username) {
    if (username in users) {
        currentUser = username;
        return ("331 User exists waiting for pwd");
    }
    return ("User does not exists");
}

function pass(password) {
    if (users[currentUser] == password)
        return ("230 authentification succeeded");
    return ("430 Authentification failed, wrong ids");
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
        return (process.cwd());
    }
    catch (e) {
        return (e.toString());
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

function retr(argument, c) {
    let read = fs.createReadStream(argument);
    read.on('data', data => {
        c.write(data);
    })
    return 0;
}

function stor(argument, c) {
    cmd = "STOR";
    file = argument;
    console.log(cmd + " file = " + file);
    c.write('Send me');
}

function start_Copy(c, data) {
    wstream = fs.createWriteStream(file);
    wstream.write(data);
    wstream.on('finish', () => {
        console.log('ended');
    })
}