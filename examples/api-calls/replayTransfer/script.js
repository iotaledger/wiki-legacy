var request = require('request');

var command = {
  'command': 'replayTransfer',
  'transaction': 'BXMNQGX9FGRCWDYNGBNKOBVRZKHWNDZQSX9OVWMVRMMJIGLMBEIMZIMEKDZBFIPBYALKOQHAUZM9Z9999'
}

var options = {
  url: 'http://localhost:14265',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
