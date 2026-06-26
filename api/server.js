const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();

// Copia o db.json para a pasta temporária /tmp que permite escrita
const dbPath = path.join('/tmp', 'db.json');
if (!fs.existsSync(dbPath)) {
  const originalDb = fs.readFileSync(path.join(process.cwd(), 'db.json'), 'utf8');
  fs.writeFileSync(dbPath, originalDb);
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
