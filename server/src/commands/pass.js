import { currentUser } from '../server'
import fs from 'fs';

export function pass(password) {
    let users = JSON.parse(fs.readFileSync('users.json'));
    if (users[currentUser] == password)
        return ("230 authentification succeeded");
    return ("430 Authentification failed, wrong ids");
}