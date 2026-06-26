const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Carrega o banco de dados db.json em memória para evitar erro EROFS (sistema de arquivos somente leitura)
// no Vercel quando rotas POST/PUT/DELETE forem chamadas.
const db = JSON.parse(fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8'));
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// Configura CORS de forma explícita
server.use(cors());
server.use(middlewares);

// Habilita reescrita de rotas com prefixo /api para rotas normais
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(router);

module.exports = server;
