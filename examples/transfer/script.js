var request = require('request');

var command = {
  'command': 'transfer',
  'seed': 'AAA999999999999999999999999999999999999999999999999999999999999999999999999999999',
  'address': 'NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB',
  'value': '1',
  'message': '',
  'securityLevel': 1,
  'minWeightMagnitude': 13
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
