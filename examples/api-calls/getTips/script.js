var request = require('request');

var command = {
  'command': 'getTips'
}

var options = {
  url: 'http://localhost:14265',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(command))
  },
  json: command
};

request.post('http://localhost:14265',JSON.stringify(command), function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
