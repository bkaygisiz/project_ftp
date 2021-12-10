export function pass(password) {
    if (users[currentUser] == password)
        return ("230 authentification succeeded");
    return ("430 Authentification failed, wrong ids");
}