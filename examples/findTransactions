import urllib2
import json

command = {
    'command': 'findTransactions',
    'addresses': ['9UGGUPLU9CDPSXKVTPVDHPDVOSBRQGFKXCKRUQUVFDTROCVIQNWO9EAVFC9EVMBPOBUWGKPZOIU9L9MV9','9GOCDMWAAQAFJLZYCSCFCKIRJFQBQHWRIJQGZCUGNYCBJ9BYKQVLCNLOT9FZWE9KEUMZJYQ9LIYWVEQNZ']
}

stringified = json.dumps(command)

headers = {'content-type': 'application/json'}

request = urllib2.Request(url="http://localhost:14265", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
