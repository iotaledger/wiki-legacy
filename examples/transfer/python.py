import urllib2
import json

command = {
    'command': 'transfer',
    'seed': 'AAA999999999999999999999999999999999999999999999999999999999999999999999999999999',
    'address': 'NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB',
    'value': '1',
    'message': '',
    'securityLevel': 1,
    'minWeightMagnitude': 13
}

stringified = json.dumps(command)

headers = {'content-type': 'application/json'}

request = urllib2.Request(url="http://localhost:14265", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
