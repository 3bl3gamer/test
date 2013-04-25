//запскать а-ля "node mon.js server.js bla bla qwe"

var fs = require('fs');
var spawn = require('child_process').spawn;
//   ['node', 'mon.js', 'server.js', 'bla', 'bla', 'qwe'] ->
//-> ['server.js', 'bla', 'bla', 'qwe']
var args = process.argv.slice(2);
var file = args[0];

var proc;
function start() {
	proc = spawn("node", args);
	console.log("<"+file+"> started, pid: "+proc.pid);
	proc.stdout.on('data', function (data) {
		process.stdout.write(data);
	});
	proc.stderr.on('data', function (data) {
		process.stderr.write(data);
	});
	//proc.on('close', function (code, signal) {
	//	console.log('child process terminated due to receipt of signal '+signal);
	//});
}

start();
fs.watchFile(file, function(curr,prev) {
	proc.kill("SIGTERM"); //или более суровый SIGKILL
	start();
});
console.log("started");
