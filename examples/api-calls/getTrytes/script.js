var request = require('request');

var command = {
  'command': 'getTrytes',
  'hashes': ['DIPJBXJKXNYYOXRLCDO9KJJAJSRVTIJSJAYSZSKLKTAHHBSW9LOVSICEVMUHFNIBZT9ETIGBOBVSURJQCSGUIXTWP9']
}

var options = {
  url: 'http://localhost:14265',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': JSON.stringify(command).length
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
