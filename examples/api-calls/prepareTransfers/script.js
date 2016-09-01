var request = require('request');

var command = {
  'command': 'prepareTransfers',
  'seed': 'AAA999999999999999999999999999999999999999999999999999999999999999999999999999999',
  'securityLevel': 1,
  'transfers': [
      {
          'address': 'NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB',
          'value': '1',
          'message': ''
      }, {
          'address': 'NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB',
          'value': '0',
          'message': 'SECRETMESSAGE'
      }
  ]
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

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
