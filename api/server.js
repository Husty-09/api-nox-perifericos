const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();

// Copia o db.json para a pasta temporária /tmp que permite escrita
const dbPath = path.join('/tmp', 'db.json');
if (!fs.existsSync(dbPath)) {
  // Usamos require para forçar o empacotador do Vercel a incluir o arquivo no deploy
  const originalDb = require('../db.json');
  fs.writeFileSync(dbPath, JSON.stringify(originalDb));
}

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Redireciona a rota /api para a raiz
server.use(jsonServer.rewriter({
  "/api/*": "/$1"
}));
server.use(router);

module.exports = server;
