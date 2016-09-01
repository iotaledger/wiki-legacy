var http = require('http');

var command = {
    'command': 'getNodeInfo'
}

var options = {
  hostname: 'localhost',
  port: 14265,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(command))
  }
};

var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function(data) {
    console.log(JSON.parse(data));
  })
})

req.write(JSON.stringify(command));
