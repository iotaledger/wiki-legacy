import urllib2
import json

command = {
    'command': 'setConfig',
    'lines': ['+udp://8.8.8.8:14265', '+udp://8.8.8.9:14265', '^1000', '#3']
}

stringified = json.dumps(command)

headers = {
  'content-type': 'application/json'
}

request = urllib2.Request(url="http://localhost:14265", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
