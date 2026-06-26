const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();

// Carrega o banco de dados original (em memória)
const db = require('../db.json');
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  if (req.query && req.query.path) {
    req.url = '/' + req.query.path;
    delete req.query.path;
  }
  next();
});

server.use(middlewares);
// Redireciona a rota /api para a raiz
server.use(jsonServer.rewriter({
  "/api/*": "/$1"
}));
server.use(router);

module.exports = server;
