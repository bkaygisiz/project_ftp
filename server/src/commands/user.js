import fs from 'fs';
export let currentUsr = "";
export function user(username) {
    let users;
    try {
        users = JSON.parse(fs.readFileSync('users.json'));
    }
    catch (err) {
        console.log(err);
    }
    if (username in users) {
        currentUsr = username;
        return ("331 User exists waiting for pwd");
    }
    return ("User does not exists");
}