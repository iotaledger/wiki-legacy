var request = require('request');

var command = {
    'command': 'setConfig',
    'lines': ['+udp://8.8.8.8:14265', '+udp://8.8.8.9:14265', '^1000', '#3']
}

var headers = {
    'Content-Type': 'application/json',
    'Content-Length': JSON.stringify(command).length
};

var options = {
  url: 'http://localhost:14265',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(command))
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
