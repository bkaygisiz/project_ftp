import { launch } from './server';
const port = process.argv[2];
launch('localhost', port);