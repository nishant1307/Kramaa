
var mosca = require('mosca');
var settings = {
		port:1883
		}

var server = new mosca.Server(settings);

server.on('ready', function(){
  console.log("ready");
});

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});
