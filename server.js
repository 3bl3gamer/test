var http = require('http');
var i=0;
http.createServer(function (req, res) {
	i++;
	res.writeHead(200, {
		'Content-Type': 'text/plain'});
	res.write('Hello World'+i+req.path+'\n');
	res.end();
}).listen(9000);
console.log("started");
