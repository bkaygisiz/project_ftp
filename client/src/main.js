import { connect } from './client'
const host = process.argv[2];
const port = process.argv[3];
console.log('arg : ' + host + port);
connect(host, port);