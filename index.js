const jsonServer = require('json-server');
const server = jsonServer.create();
const middleware = jsonServer.defaults();
const init = require('./services');
const walk = require('./utils/walk');
const cors = require('./utils/cors');

const port = 3000;

let ang;

walk('./services', function (err, results) {
	if (err) {
		console.log(err);
	} else {
		ang = init(results);

		server.use(cors);

		server.use(jsonServer.bodyParser);
		server.use(middleware);

		//
		server.use(ang.routes);
		server.use(ang.middleware);
		server.use(ang.db);

		server.listen(port, function () {
			console.log(`JSON Server is running on ${port}`);
		});
	}
});
