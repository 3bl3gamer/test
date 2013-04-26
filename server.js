var http = require('http');
http.createServer(function (req, res) {
	var data="";
	req.on('data', function (d) {
		data+=d;
	});
	req.on('end', function () {
		console.log(["data",data, req.url]);
		res.writeHead(200, {
			'Content-Type': 'text/plain'});
		res.write("1");
		res.end();
	});
}).listen(9000);
console.log("started");
