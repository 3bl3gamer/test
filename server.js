gps=[];
function reparse(str) {
	var spl = str.replace(/a/g,",").split("b");
	for (var i in spl) {
		var s = spl[i];
		if (s.length==0 || s.charAt(0) != 'g') continue;
		var c = s.substr(1,s.length-2);
		console.log(c);
		gps.push(c);
	}
}


var http = require('http');
http.createServer(function (req, res) {
	switch (req.url) {
	case "/add":
		var data="";
		req.on('data', function (d) {
			data+=d;
		});
		req.on('end', function () {
			reparse(data.substr(5));
			res.end();
		});
		break;
	
	case "/":
		res.writeHead(200, {
			'Content-Type': 'text/plain'});
		res.write(gps.join("\n"));
		res.end();
		break;
	}
}).listen(9000);
console.log("started");
