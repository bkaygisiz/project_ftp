export function cwd(path) {
    try {
        process.chdir(path);
        return (process.cwd());
    }
    catch (e) {
        return (e.toString());
    }
}