const restify = require('restify');

const route = require("./routes");


const server = restify.createServer();


server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());
route(server)

module.exports = server;