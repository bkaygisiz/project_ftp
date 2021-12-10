# project_ftp
## Install dependencies
Install in both client and server repositories, the npm dependencies
```bash
cd server/
npm install
cd ../client
npm install
```
## Build client and server

Use npm to build both server and client

```bash
cd server/
npm run build
cd ../client
npm run build
```

## Usage
Run server
```bash
cd server/
npm run dev <port>
```
Then run client
```bash
cd ../client/
npm run dev <host> <port>
```
host is normally localhost, and you choose the port you want to use

## Help
Run the command HELP on client to see all the commands
```bash
ftp@localhost:8124: HELP
HELP
{"USER <username>":"check if the user exist"
"PASS <password>":"authenticate the user with a password"
"LIST":"list the current directory of the server"
"CWD <directory>":"change the current directory of the server"
"RETR <filename>":"transfer a copy of the file FILE from the server to the client"
"STOR <filename>":"transfer a copy of the file FILE from the client to the server"
"PWD":"display the name of the current directory of the server"
"HELP":"send helpful information to the client"
"QUIT":"close the connection and stop the program"}

ftp@localhost:8124: 
```

