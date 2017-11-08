const requireAll = require("require_all")(module);

const routes = requireAll("./",{exclude:/index.js/})["."]

module.exports = function (server) {
	for(let v in routes){
		routes[v].applyRoutes(server)
	}
}

// console.log(routes)