import fs from 'fs';
export function user(username) {
    let users = JSON.parse(fs.readFileSync('users.json'));
    if (username in users) {
        currentUser = username;
        return ("331 User exists waiting for pwd");
    }
    return ("User does not exists");
}