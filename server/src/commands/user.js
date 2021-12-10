import fs from 'fs';
export let currentUsr = "";
export function user(username) {
    let users = JSON.parse(fs.readFileSync('users.json'));
    if (username in users) {
        currentUsr = username;
        return ("331 User exists waiting for pwd");
    }
    return ("User does not exists");
}