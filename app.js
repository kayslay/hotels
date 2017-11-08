const restify = require('restify');

const route = require("./routes");


const server = restify.createServer();

route(server)
server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());


module.exports = server;