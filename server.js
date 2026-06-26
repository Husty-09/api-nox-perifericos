const jsonServer = require('json-server');
const server = jsonServer.create();

// Carrega o banco de dados original (em memória)
const db = require('./db.json');
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = server;
