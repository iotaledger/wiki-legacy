## FOR OUR DEDICATED DOCUMENTATION WEBSITE, PLEASE GO TO: [https://iota.readme.io/v1.0/docs](https://iota.readme.io/v1.0/docs)

***

# What is IOTA?

IOTA is a revolutionary new **transactional settlement** and **data transfer layer for the Internet of Things**. It’s based on a new distributed ledger, the Tangle, which gets rid off the inefficiencies of current Blockchain designs and introduces a new way of reaching consensus in a decentralized peer-to-peer system. For the first time ever, through IOTA people can transfer money without any fees. This means that even infinitesimally small nanopayments can be made through IOTA.

IOTA is the missing puzzle piece for the Machine Economy to fully emerge and reach its desired potential. We envision IOTA to be the public, permissionless backbone for the Internet of Things that enables true interoperability between all devices.

For a more thorough introduction about IOTA, please refer to ….

> ## IOTA IS CURRENTLY IN BETA

> It should be noted that IOTA is currently still in Beta. This means that the current Java implementation is an **unoptimized reference implementation**. Major improvements to performance, features as well as ease of use will be made over the coming months.


***
## Table of Contents

- **[Installation](#installation)**
- **[Glossary](#glossary)**
- **[API Introduction](#api-introduction)**
- **[Interacting with the API](#interacting-with-the-api)**
    - **[Making Requests](#making-requests)**
    - **[CORS](#cors)**
    - **[Errors](#errors)**
    - **[Fields](#fields)**
- **[API Commands](#api-commands)**
    - **[`getNodeInfo`](#getnodeinfo)**
    - **[`getMilestone`](#getmilestone)**
    - **[`getPeers`](#getneighborsactivity)**
    - **[`getTips`](#gettips)**
    - **[`getTransfers`](#gettransfers)**
    - **[`findTransactions`](#findtransactions)**
    - **[`getInclusionStates`](#getinclusionstates)**
    - **[`getBundle`](#getbundle)**
    - **[`getTrytes`](#getrytes)**
    - **[`analyzeTransactions`](#analyzetransactions)**
    - **[`getNewAddress`](#getnewaddress)**
    - **[`prepareTransfers`](#preparetransfers)**
    - **[`getTransactionsToApprove`](#gettransactionstoapprove)**
    - **[`attachToTangle`](#attachtotangle)**
    - **[`interruptAttachingToTangle`](#interruptattachtotangle)**
    - **[`pushTransactions`](#pushtransactions)**
    - **[`pullTransactions`](#pulltransactions)**
    - **[`storeTransactions`](#storeTransactions)**
    - **[`transfer`](#transfer)**
    - **[`replayTransfer`](#replaytransfer)**

***

## Installation

For an easy to follow tutorial, please go to [https://iota.readme.io](https://iota.readme.io) More tutorials coming soon.

## Glossary

Because IOTA introduces some rather new concepts to the Blockchain-space, we will list a couple of terms which are important to understand in order to fully grasp IOTA.

### Generic Terms

* **`Peer to Peer Network`**: Decentralized network consisting of peers (or nodes) which are connected with each other and perform some form of data sharing with each other.
* **`Proof of Work`**: Algorithm which prevents Denial of Service and spam attacks on a network. Computationally hard puzzle, but easy to verify.
* **`Trinary`**: Alternative to binary, which consists of three states: 1, -1 and unknown.
* **`DAG`**: Directed Acyclic Graph. Is a specific data structure structure based on a graph without any directed cycles. Instead of having a single branch with nodes having only one edge, in a DAG there can be multiple branches. Refer to [Wikipedia](https://en.wikipedia.org/wiki/Directed_acyclic_graph) for more information.

### IOTA Specific Terms

* **`Tangle`**: A directed acyclic graph (DAG) as a distributed ledger which stores all transaction data of the IOTA network. It is a Blockchain without the blocks and the chain (so is it really a Blockchain?). The Tangle is the first distributed ledger to achieve **scalability**, **no fee transactions** as well as **quantum proof security**. Contrary to today’s Blockchains, consensus is no-longer decoupled but instead an intrinsic part of the system, leading to a decentralized and self-regulating peer-to-peer network.
* **`Seed`**: 81-char string consisting only of uppercase latin letters and 9's which is used to access an account. A seed is like a private key/password. Keep it secure and don't share it with anyone. If someone has access to your seed they can access your account.
* **`Tips`**: Unconfirmed transactions which have no other transactions referencing them.
* **`Confirm/Validate`**: In order to broadcast a new transaction in IOTA, you must first validate two previous transactions. This validations happens through cross-checking for conflicting transactions as well as the completion of a Proof of Work puzzle.
* **`Branch/Trunk Transactions`**: Two transactions which were referenced by another transaction.
* **`Bundle`**: Transactions which are bundled (or grouped) together during the execution of a transfer.
* **`MAM`**: Masked Authenticated Messaging. A unique module on top of IOTA, that makes it possible to send data fully encrypted to authenticated parties.

## API Introduction


The IOTA Java client makes it possible to interact with your local node and request certain information or actions to be taken. Once your node is successfully setup, you can interface with it through port `14265` by passing along a JSON object which contains a specified command; and upon successful execution of the command, returns your requested information.

For your convenience, we have added concrete examples on how to use the API in Curl, Python and NodeJS. If you are using Javascript, you can simply follow along by using either XMLHttpRequest or jQuery. For NodeJS, please install the wonderful [request npm package](https://github.com/request/request), as all our examples require the request package. You can find an example on how to do it with the [HTTP package here](/examples/getNodeInfo/script_http.js).

**All Code examples can be found here: [Code Examples](/examples/)**

For the rest of this documentation it is assumed that you have the IOTA client running at port `14265` (or a port of your choice, change your requests accordingly then).

## Interacting with the API

### Making Requests

All API calls need to be sent to `http://localhost:14265` (if you are using the standard port) via a POST HTTP request. The data which will be sent is a **JSON object** which follows the same standard schema of:

    {‘command’:’YOURCOMMANDHERE’}

Additional parameters are simply added as additional key-value pairs. If the command is successfully executed, your requested information is returned as either an object or a stringified object (use json.parse or equivalent to turn it into an object).

### CORS

CORS is enabled by default.

TO BE ADDED

### Errors

TO BE ADDED

### Fields

Here we list and describe all additional parameters which are required to be passed along for certain commands.

- **`seed`**: `string` 81-char encoded string which contains the accounts seed. The seed must be correctly encoded: only uppercase latin letters and 9’s. No other characters are allowed.  
- **`address`**: `string` 81-char long address of the recipient of a transaction.
value: string the quantity of IOTA’s which should be transferred.
- **`message`**: `string` tryte-encoded string which can contain arbitrary information and is sent alongside a transaction. The message value is publicly visible. The max value is 2187 trytes (or roughly 1312 bytes).
- **`transaction`**: `string` hash of a transaction. A single transaction hash is 81-chars long.
- **`trytes`**: `string` the raw data of a transaction
- **`bundles`**: `list` contains a list of transaction bundles. Bundles are basically linked, individual transactions which were created with a single transfer. They are uniquely identified by a 27-char hash.
- **`addresses`** : `list` a list of addresses. A single address is 81-chars long.
- **`digests`**: `list` the message digest of a transaction.
- **`approvees`**: `list` a list of transaction which were referenced by this transaction
- **`securityLevel`**: `int` specifies the security level of your transaction. Can either by 0 (for 81-trit security), 1 (for 162-trit security) and 2 (for 243-trit security). Lower security transactions are faster to generate.
- **`minWeightMagnitude`**: `int` specifies the amount of Proof of Work that will be carried out. Currently can only take the value 13.


## API Commands

### `getNodeInfo`

Returns information about your node.

**NodeJS request example**

```javascript
var request = require('request');

var command = {
    'command': 'getNodeInfo'
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
```

**Return value**

```javascript
{
  appName: 'IRI',
  appVersion: '1.0.2',
  incomingPacketsBacklog: 0,
  jreAvailableProcessors: 4,
  jreFreeMemory: 21436344,
  jreMaxMemory: 1908932608,
  jreTotalMemory: 243793920,
  milestoneIndex: 45863,
  neighbors: 12,
  time: 1469881727083,
  tips: 18344,
  transactionsToRequest: 11
}
```

- **`appName`**: Name of the IOTA software you're currently using (IRI stands for Initial Reference Implementation).
- **`appVersion`**: The version of the IOTA software you're currently running.
- **`incomingPacketsBacklog`**: Backlog of transaction packets which have not been processed.
- **`jreAvailableProcesses`**: Available cores on your machine for JRE.
- **`jreFreeMemory`**: Returns the amount of free memory in the Java Virtual Machine.
- **`jreMaxMemory`**: Returns the maximum amount of memory that the Java virtual machine will attempt to use.
- **`jreTotalMemory`**: Returns the total amount of memory in the Java virtual machine.
- **`milestone`**: Latest milestone of the coordinator.
- **`time`**: Current UNIX timestamp.
- **`tips`**: Number of tips in the network.
- **`transactionsToRequest`**: Transactions to request during syncing process.

***

### `getMilestone`

Returns a milestone from a given index.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`index` | integer | Yes | Milestone index.


***

### `getPeers`

Returns the latest activity of your peers.

**NodeJS request example**

```javascript
var request = require('request');

var command = {
    'command': 'getPeers'
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
```

**Return value**

```javascript
{ peers:
   [
     { address: '/8.8.8.8:14265',
       latestReceivedNewTransactionTimeDelta: 56323,
       latestSentTransactionTimeDelta: '1629' },
     { address: '/8.8.8.8:14265',
       latestReceivedNewTransactionTimeDelta: null,
       latestSentTransactionTimeDelta: '4285' },
     { address: '/8.8.8.8:14265',
       latestReceivedNewTransactionTimeDelta: null,
       latestSentTransactionTimeDelta: '9821'
     }
  ]
}
```

**`address`** : address of your peer
**`latestReceivedNewTransactionTimeDelta`**: ms since latest packet received
**`latestSentTransactionTimeDelta`**: ms since latest packet sent

***

### `getTips`

Returns the current list of visible tips.

**Return value**
List of all tips.

***

### `getTransfers`

Get the list of transfers from a specified seed (account). The securityLevel determines from which account you want to get the list of transfers, a different securityLevel brings up a different account. This API call does not return messages which were sent to this account. Use `findTransactions` for that.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`seed` | string | Yes | Seed of a specified account. Has to be 81-chars encoded.
`securityLevel` | integer | Yes | SecurityLevel of your account and its transfers. A different securityLevel gives a different account.

**NodeJS example request**
```javascript
var request = require('request');

var command = {
  'command': 'getTransfers',
  'seed': 'AAA999999999999999999999999999999999999999999999999999999999999999999999999999999',
  'securityLevel': 1
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
```

**Return value**

The return value includes both, inbound and outbound transactions. **Persistence indicates if the transaction is confirmed or not.** The value field determines which type of transaction it is, as explained in the following table:

Value | Type of Transaction | Description
------------ | ------------- | -------------
negative | Send transaction | If the value is negative, it is a send/outbound transaction.
positive | Receive Transaction | If the value is above 0, then it is an incoming/receive transaction.
zero | Address generation | If the value is zero, then it's a transaction which generated and assigned a new address to your account. In this case, the `address` field is the newly generated address.

```javascript
{
  transfers:
   [
     { hash: 'IYYQXMSLBRTOKWWRDALHUBLXM9PHSAEIXJJDNMWGYZJYZDQHCSSGEIKIHOFWBBBHDEKTQKGRYFRZY9999',
       timestamp: '1468652572',
       address: 'BDRZJZXZGMXI9YIMFAFFYLAQBFUKYDRJWK9QZC9KFAZLRSNDPTYAFFEHSLUEEUCNKYRVTCZJLTSNTRVU9',
       value: '0',
       persistence: 100 },
     { hash: 'MAPBDNYBQRKRPLZMPJNNWYBTBWOJZVDXEYLDVBDVBRSECSUR9ZQCCFS9QBWFELGAFHRVBXIFMJXNA9999',
       timestamp: '1468652839',
       address: 'CLZOTFWXLSDRYJHNAELX9VVR99CTSAKVAFESBOXKPQJVAC9JRYJTCVFESINHBPQNOEFYBXYXMPSNLWX9C',
       value: '10000',
       persistence: 100 },
     { hash: 'FZQSOFAK9TVQKAIHADLAODVRTQRDJXNREVMMEUTSIOJVYCNGV9SNQX9DBOHUJNYAZWLHHAJMLQFND9999',
       timestamp: '1468656293',
       address: 'GFNOYSUAK9INRGFBNHHMAXTRKAPQSJXJKTMCRY9HFC9NVMREEYSIMTXQKXLREWBBVIYHEXJD9SW9CKYPT',
       value: '-5',
       persistence: 0
     }
   ]
}
```

***

### `findTransactions`

Find the transactions which match the specified input and return. All input values are lists, for which a list of return values (transaction hashes), in the same order, is returned for all individual elements. The input fields can either be `bundles`, `addresses`, `digests` or `approvees`. **Using multiple of these input fields returns the intersection of the values.**

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`bundles` | list | Optional | List of bundle hashes. The hashes need to be extended to 81chars by padding the hash with 9's.
`addresses` | list | Optional | List of addresses.
`digests` | list | Optional | List of message digests.
`approvees` | list | Optional | List of approvee transaction hashes.

**NodeJS request example**

```javascript
var request = require('request');

var command = {
  'command': 'findTransactions',
  'addresses': ['RVORZ9SIIP9RCYMREUIXXVPQIPHVCNPQ9HZWYKFWYWZRE9JQKG9REPKIASHUUECPSQO9JT9XNMVKWYGVAZETAIRPTM']
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

```

**Return Value**

The return value depends on your input. For each specified input value, the command will return the following:

- **`bundles`**: returns the list of transactions which contain the specified bundle hash.
- **`addresses`**: returns the list of transactions which have the specified address as an input/output field.
- **`digests`**: returns the list of transactions which contain the specified digest value.
- **`approvees`**: returns the list of transaction which reference (i.e. confirm) the specified transaction.

```javascript
{
  hashes: [
    'ZJVYUGTDRPDYFGFXMKOTV9ZWSGFK9CFPXTITQLQNLPPG9YNAARMKNKYQO9GSCSBIOTGMLJUFLZWSY9999'
  ]
}
```

***

### `getInclusionStates`

Get the inclusion states of a set of transactions. This is for determining if a transaction was accepted and confirmed by the network or not. You can search for multiple tips (and thus, milestones) to get past inclusion states of transactions. This API call simply returns a list of boolean values in the same order as the transaction list you submitted, thus you get a true/false whether a transaction is confirmed or not.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`transactions` | list | Yes | List of transactions you want to get the inclusion state for.
`tips` | list | Yes | List of tips (including milestones) you want to search through.


**NodeJS request example**

```javascript
var request = require('request');

var command = {
    'command': 'getInclusionStates',
    'transactions': ['QHBYXQWRAHQJZEIARWSQGZJTAIITOZRMBFICIPAVD9YRJMXFXBDPFDTRAHHHP9YPDUVTNOFWZGFGWMYHEKNAGNJHMW'],
    'tips': ['ZIJGAJ9AADLRPWNCYNNHUHRRAC9QOUDATEDQUMTNOTABUVRPTSTFQDGZKFYUUIE9ZEBIVCCXXXLKX9999']
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

```

**Return Value**

```javascript
{"states": [true], "duration": 91}
```

***

### `getBundle`

Get the list of transactions which were bundled with the specified transaction. This call returns the full value of all individual transactions, not just the hashes. This API call only works with tail (index = 0) transaction of a bundle.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`transaction` | string | Yes | Hash of the tail transaction in a bundle.

**NodeJS request example**
```javascript
var request = require('request');

var command = {
    'command': 'getBundle',
    'transaction': 'ZJVYUGTDRPDYFGFXMKOTV9ZWSGFK9CFPXTITQLQNLPPG9YNAARMKNKYQO9GSCSBIOTGMLJUFLZWSY9999'
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
```

**Return Value**

It should be noted that I've removed the `signatureMessageChunk` value in this example simply to make it  shorter.

```javascript
{ transactions:
   [ { hash: 'ZJVYUGTDRPDYFGFXMKOTV9ZWSGFK9CFPXTITQLQNLPPG9YNAARMKNKYQO9GSCSBIOTGMLJUFLZWSY9999',
       type: 1,
       signatureMessageChunk: 'SHORTENEDFORTUTORIAL',
       digest: '999999999999999999999999999999999999999999999999999999999999999999999999999999999',
       address: 'RVORZ9SIIP9RCYMREUIXXVPQIPHVCNPQ9HZWYKFWYWZRE9JQKG9REPKIASHUUECPSQO9JT9XNMVKWYGVA',
       value: '5000',
       timestamp: '1467664647',
       index: '0',
       bundle: 'NKZKEKWLDKMJCI9N9XQOLWEPAYW',
       signatureNonce: '999999999999999999999999999',
       approvalNonce: 'WD9NOXDAYTXABZOPSEI9XZSMRB9LGKQER9QAERTNSOUIFMQKPAQHECGVBJRMW9MSEMYFZOUZF9CDLGYOE',
       trunkTransaction: 'VLVNRHJNYQIXNVJVTVJHDKPNPBECKYLGZYMDHPJLGWHYSFCFUOSCRQGBJUZSZRJVAYJAFDZOBQCJA9999',
       branchTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999' },
     { hash: 'VLVNRHJNYQIXNVJVTVJHDKPNPBECKYLGZYMDHPJLGWHYSFCFUOSCRQGBJUZSZRJVAYJAFDZOBQCJA9999',
       type: 1,
       signatureMessageChunk: 'SHORTENEDFORTUTORIAL',
       digest: '999999999999999999999999999999999999999999999999999999999999999999999999999999999',
       address: 'LCWZDIQTDXIXIXYTJWJUZTIKIIUULLP9BB9MODWNUWWGNRSNCKUZPAFYYYANCGZDZQARIFUQOEXTQWMFR',
       value: '1061291639544',
       timestamp: '1467664647',
       index: '1',
       bundle: 'NKZKEKWLDKMJCI9N9XQOLWEPAYW',
       signatureNonce: '999999999999999999999999999',
       approvalNonce: 'OBPYOZAJAJJPYCXAYTGTECDTNMAYLQAJTPAGS9YCSQJVCZZEMQOADTPZRKIDXRPXKSOLTAPPER99KMSUZ',
       trunkTransaction: 'UWPITSAOKBQYHADDZHSDNTIUNETKLKFBDMRWKLJXSUOUZEUPICAGJWISEEAVLHGLHUUMJYZBKQW9C9999',
       branchTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999' },
     { hash: 'UWPITSAOKBQYHADDZHSDNTIUNETKLKFBDMRWKLJXSUOUZEUPICAGJWISEEAVLHGLHUUMJYZBKQW9C9999',
       type: -1,
       signatureMessageChunk: 'SHORTENEDFORTUTORIAL',
       digest: '999999999999999999999999999999999999999999999999999999999999999999999999999999999',
       address: 'NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB',
       value: '-1061291644544',
       timestamp: '1467664647',
       index: '2',
       bundle: 'NKZKEKWLDKMJCI9N9XQOLWEPAYW',
       signatureNonce: 'SH9999999999999999999999999',
       approvalNonce: 'VCF9VJOIYNBVTZMLEVIIGYXZOJVHYCEHLOBLNMESIBCGQOSOWZCKFX9SOVPEDEWJYGITUVAVRYE9OPNOA',
       trunkTransaction: 'OAATQS9VQLSXCLDJVJJVYUGONXAXOFMJOZNSYWRZSWECMXAQQURHQBJNLD9IOFEPGZEPEMPXCIVRX9999',
       branchTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999' },
     { hash: 'OAATQS9VQLSXCLDJVJJVYUGONXAXOFMJOZNSYWRZSWECMXAQQURHQBJNLD9IOFEPGZEPEMPXCIVRX9999',
       type: -1,
       signatureMessageChunk: 'SHORTENEDFORTUTORIAL',
       digest: '999999999999999999999999999999999999999999999999999999999999999999999999999999999',
       address: 'NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB',
       value: '0',
       timestamp: '1467664647',
       index: '3',
       bundle: 'NKZKEKWLDKMJCI9N9XQOLWEPAYW',
       signatureNonce: 'SH9999999999999999999999999',
       approvalNonce: 'KDDTGZLIPBNZKMLTOLOXQVNGLASESDQVPTXALEKRMIOHQLUHD9ELQDBQETS9QFGTYOYWLNTSKKMVJAUXS',
       trunkTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999',
       branchTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999'
     }
  ]
}
```

***


### `getTrytes`

Returns the raw trytes data of a transaction.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`hashes` | list | Yes | List of transaction hashes of which you want to get the raw data from.

**NodeJS request example**

```javascript
var request = require('request');

var command = {
  'command': 'getTrytes',
  'hashes': ['OAATQS9VQLSXCLDJVJJVYUGONXAXOFMJOZNSYWRZSWECMXAQQURHQBJNLD9IOFEPGZEPEMPXCIVRX9999']
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
```

**Return Value**

```javascript
{
  trytes: [ 'BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUSDXZHOFHWHL9MQPVJXXZLIXPXPXF9KYEREFSKCPKYIIKPZVLHUTDFQKKVVBBN9ATTLPCNPJDWDEVIYYLGPZGCWXOBDXMLJC9VO9QXTTBLAXTTBFUAROYEGQIVB9MJWJKXJMCUPTWAUGFZBTZCSJVRBGMYXTVBDDS9MYUJCPZ9YDWWQNIPUAIJXXSNLKUBSCOIJPCLEFPOXFJREXQCUVUMKSDOVQGGHRNILCO9GNCLWFM9APMNMWYASHXQAYBEXF9QRIHIBHYEJOYHRQJAOKAQ9AJJFQ9WEIWIJOTZATIBOXQLBMIJU9PCGBLVDDVFP9CFFSXTDUXMEGOOFXWRTLFGV9XXMYWEMGQEEEDBTIJ9OJOXFAPFQXCDAXOUDMLVYRMRLUDBETOLRJQAEDDLNVIRQJUBZBO9CCFDHIX9MSQCWYAXJVWHCUPTRSXJDESISQPRKZAFKFRULCGVRSBLVFOPEYLEE99JD9SEBALQINPDAZHFAB9RNBH9AZWIJOTLBZVIEJIAYGMC9AZGNFWGRSWAXTYSXVROVNKCOQQIWGPNQZKHUNODGYADPYLZZZUQRTJRTODOUKAOITNOMWNGHJBBA99QUMBHRENGBHTH9KHUAOXBVIVDVYYZMSEYSJWIOGGXZVRGN999EEGQMCOYVJQRIRROMPCQBLDYIGQO9AMORPYFSSUGACOJXGAQSPDY9YWRRPESNXXBDQ9OZOXVIOMLGTSWAMKMTDRSPGJKGBXQIVNRJRFRYEZ9VJDLHIKPSKMYC9YEGHFDS9SGVDHRIXBEMLFIINOHVPXIFAZCJKBHVMQZEVWCOSNWQRDYWVAIBLSCBGESJUIBWZECPUCAYAWMTQKRMCHONIPKJYYTEGZCJYCT9ABRWTJLRQXKMWY9GWZMHYZNWPXULNZAPVQLPMYQZCYNEPOCGOHBJUZLZDPIXVHLDMQYJUUBEDXXPXFLNRGIPWBRNQQZJSGSJTTYHIGGFAWJVXWL9THTPWOOHTNQWCNYOYZXALHAZXVMIZE9WMQUDCHDJMIBWKTYH9AC9AFOT9DPCADCV9ZWUTE9QNOMSZPTZDJLJZCJGHXUNBJFUBJWQUEZDMHXGBPTNSPZBR9TGSKVOHMOQSWPGFLSWNESFKSAZY9HHERAXALZCABFYPOVLAHMIHVDBGKUMDXC9WHHTIRYHZVWNXSVQUWCR9M9RAGMFEZZKZ9XEOQGOSLFQCHHOKLDSA9QCMDGCGMRYJZLBVIFOLBIJPROKMHOYTBTJIWUZWJMCTKCJKKTR9LCVYPVJI9AHGI9JOWMIWZAGMLDFJA9WU9QAMEFGABIBEZNNAL9OXSBFLOEHKDGHWFQSHMPLYFCNXAAZYJLMQDEYRGL9QKCEUEJ9LLVUOINVSZZQHCIKPAGMT9CAYIIMTTBCPKWTYHOJIIY9GYNPAJNUJ9BKYYXSV9JSPEXYMCFAIKTGNRSQGUNIYZCRT9FOWENSZQPD9ALUPYYAVICHVYELYFPUYDTWUSWNIYFXPX9MICCCOOZIWRNJIDALWGWRATGLJXNAYTNIZWQ9YTVDBOFZRKO9CFWRPAQQRXTPACOWCPRLYRYSJARRKSQPR9TCFXDVIXLP9XVL99ERRDSOHBFJDJQQGGGCZNDQ9NYCTQJWVZIAELCRBJJFDMCNZU9FIZRPGNURTXOCDSQGXTQHKHUECGWFUUYS9J9NYQ9U9P9UUP9YMZHWWWCIASCFLCMSKTELZWUGCDE9YOKVOVKTAYPHDF9ZCCQAYPJIJNGSHUIHHCOSSOOBUDOKE9CJZGYSSGNCQJVBEFTZFJ9SQUHOASKRRGBSHWKBCBWBTJHOGQ9WOMQFHWJVEG9NYX9KWBTCAIXNXHEBDIOFO9ALYMFGRICLCKKLG9FOBOX9PDWNQRGHBKHGKKRLWTBEQMCWQRLHAVYYZDIIPKVQTHYTWQMTOACXZOQCDTJTBAAUWXSGJF9PNQIJ9AJRUMUVCPWYVYVARKR9RKGOUHHNKNVGGPDDLGKPQNOYHNKAVVKCXWXOQPZNSLATUJT9AUWRMPPSWHSTTYDFAQDXOCYTZHOYYGAIM9CELMZ9AZPWB9MJXGHOKDNNSZVUDAGXTJJSSZCPZVPZBYNNTUQABSXQWZCHDQSLGK9UOHCFKBIBNETK999999999999999999999999999999999999999999999999999999999999999999999999999999999NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB999999999XKBRHUD99C99999999NKZKEKWLDKMJCI9N9XQOLWEPAYWSH9999999999999999999999999KDDTGZLIPBNZKMLTOLOXQVNGLASESDQVPTXALEKRMIOHQLUHD9ELQDBQETS9QFGTYOYWLNTSKKMVJAUXSIROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999' ]
}
```

***

### `analyzeTransactions`

Analyze a raw transaction by its trytes and return the full transaction object.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`trytes` | list | Yes | Raw data of a transaction.

**NodeJS request example**

```javascript
var request = require('request');

var command = {
  'command': 'analyzeTransactions',
  'trytes': ['BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUSDXZHOFHWHL9MQPVJXXZLIXPXPXF9KYEREFSKCPKYIIKPZVLHUTDFQKKVVBBN9ATTLPCNPJDWDEVIYYLGPZGCWXOBDXMLJC9VO9QXTTBLAXTTBFUAROYEGQIVB9MJWJKXJMCUPTWAUGFZBTZCSJVRBGMYXTVBDDS9MYUJCPZ9YDWWQNIPUAIJXXSNLKUBSCOIJPCLEFPOXFJREXQCUVUMKSDOVQGGHRNILCO9GNCLWFM9APMNMWYASHXQAYBEXF9QRIHIBHYEJOYHRQJAOKAQ9AJJFQ9WEIWIJOTZATIBOXQLBMIJU9PCGBLVDDVFP9CFFSXTDUXMEGOOFXWRTLFGV9XXMYWEMGQEEEDBTIJ9OJOXFAPFQXCDAXOUDMLVYRMRLUDBETOLRJQAEDDLNVIRQJUBZBO9CCFDHIX9MSQCWYAXJVWHCUPTRSXJDESISQPRKZAFKFRULCGVRSBLVFOPEYLEE99JD9SEBALQINPDAZHFAB9RNBH9AZWIJOTLBZVIEJIAYGMC9AZGNFWGRSWAXTYSXVROVNKCOQQIWGPNQZKHUNODGYADPYLZZZUQRTJRTODOUKAOITNOMWNGHJBBA99QUMBHRENGBHTH9KHUAOXBVIVDVYYZMSEYSJWIOGGXZVRGN999EEGQMCOYVJQRIRROMPCQBLDYIGQO9AMORPYFSSUGACOJXGAQSPDY9YWRRPESNXXBDQ9OZOXVIOMLGTSWAMKMTDRSPGJKGBXQIVNRJRFRYEZ9VJDLHIKPSKMYC9YEGHFDS9SGVDHRIXBEMLFIINOHVPXIFAZCJKBHVMQZEVWCOSNWQRDYWVAIBLSCBGESJUIBWZECPUCAYAWMTQKRMCHONIPKJYYTEGZCJYCT9ABRWTJLRQXKMWY9GWZMHYZNWPXULNZAPVQLPMYQZCYNEPOCGOHBJUZLZDPIXVHLDMQYJUUBEDXXPXFLNRGIPWBRNQQZJSGSJTTYHIGGFAWJVXWL9THTPWOOHTNQWCNYOYZXALHAZXVMIZE9WMQUDCHDJMIBWKTYH9AC9AFOT9DPCADCV9ZWUTE9QNOMSZPTZDJLJZCJGHXUNBJFUBJWQUEZDMHXGBPTNSPZBR9TGSKVOHMOQSWPGFLSWNESFKSAZY9HHERAXALZCABFYPOVLAHMIHVDBGKUMDXC9WHHTIRYHZVWNXSVQUWCR9M9RAGMFEZZKZ9XEOQGOSLFQCHHOKLDSA9QCMDGCGMRYJZLBVIFOLBIJPROKMHOYTBTJIWUZWJMCTKCJKKTR9LCVYPVJI9AHGI9JOWMIWZAGMLDFJA9WU9QAMEFGABIBEZNNAL9OXSBFLOEHKDGHWFQSHMPLYFCNXAAZYJLMQDEYRGL9QKCEUEJ9LLVUOINVSZZQHCIKPAGMT9CAYIIMTTBCPKWTYHOJIIY9GYNPAJNUJ9BKYYXSV9JSPEXYMCFAIKTGNRSQGUNIYZCRT9FOWENSZQPD9ALUPYYAVICHVYELYFPUYDTWUSWNIYFXPX9MICCCOOZIWRNJIDALWGWRATGLJXNAYTNIZWQ9YTVDBOFZRKO9CFWRPAQQRXTPACOWCPRLYRYSJARRKSQPR9TCFXDVIXLP9XVL99ERRDSOHBFJDJQQGGGCZNDQ9NYCTQJWVZIAELCRBJJFDMCNZU9FIZRPGNURTXOCDSQGXTQHKHUECGWFUUYS9J9NYQ9U9P9UUP9YMZHWWWCIASCFLCMSKTELZWUGCDE9YOKVOVKTAYPHDF9ZCCQAYPJIJNGSHUIHHCOSSOOBUDOKE9CJZGYSSGNCQJVBEFTZFJ9SQUHOASKRRGBSHWKBCBWBTJHOGQ9WOMQFHWJVEG9NYX9KWBTCAIXNXHEBDIOFO9ALYMFGRICLCKKLG9FOBOX9PDWNQRGHBKHGKKRLWTBEQMCWQRLHAVYYZDIIPKVQTHYTWQMTOACXZOQCDTJTBAAUWXSGJF9PNQIJ9AJRUMUVCPWYVYVARKR9RKGOUHHNKNVGGPDDLGKPQNOYHNKAVVKCXWXOQPZNSLATUJT9AUWRMPPSWHSTTYDFAQDXOCYTZHOYYGAIM9CELMZ9AZPWB9MJXGHOKDNNSZVUDAGXTJJSSZCPZVPZBYNNTUQABSXQWZCHDQSLGK9UOHCFKBIBNETK999999999999999999999999999999999999999999999999999999999999999999999999999999999NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB999999999XKBRHUD99C99999999NKZKEKWLDKMJCI9N9XQOLWEPAYWSH9999999999999999999999999KDDTGZLIPBNZKMLTOLOXQVNGLASESDQVPTXALEKRMIOHQLUHD9ELQDBQETS9QFGTYOYWLNTSKKMVJAUXSIROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999']
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
```

**Return Value**

```javascript
{ transactions:
   [ { hash: 'OAATQS9VQLSXCLDJVJJVYUGONXAXOFMJOZNSYWRZSWECMXAQQURHQBJNLD9IOFEPGZEPEMPXCIVRX9999',
       type: -1,
       signatureMessageChunk: 'BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUSDXZHOFHWHL9MQPVJXXZLIXPXPXF9KYEREFSKCPKYIIKPZVLHUTDFQKKVVBBN9ATTLPCNPJDWDEVIYYLGPZGCWXOBDXMLJC9VO9QXTTBLAXTTBFUAROYEGQIVB9MJWJKXJMCUPTWAUGFZBTZCSJVRBGMYXTVBDDS9MYUJCPZ9YDWWQNIPUAIJXXSNLKUBSCOIJPCLEFPOXFJREXQCUVUMKSDOVQGGHRNILCO9GNCLWFM9APMNMWYASHXQAYBEXF9QRIHIBHYEJOYHRQJAOKAQ9AJJFQ9WEIWIJOTZATIBOXQLBMIJU9PCGBLVDDVFP9CFFSXTDUXMEGOOFXWRTLFGV9XXMYWEMGQEEEDBTIJ9OJOXFAPFQXCDAXOUDMLVYRMRLUDBETOLRJQAEDDLNVIRQJUBZBO9CCFDHIX9MSQCWYAXJVWHCUPTRSXJDESISQPRKZAFKFRULCGVRSBLVFOPEYLEE99JD9SEBALQINPDAZHFAB9RNBH9AZWIJOTLBZVIEJIAYGMC9AZGNFWGRSWAXTYSXVROVNKCOQQIWGPNQZKHUNODGYADPYLZZZUQRTJRTODOUKAOITNOMWNGHJBBA99QUMBHRENGBHTH9KHUAOXBVIVDVYYZMSEYSJWIOGGXZVRGN999EEGQMCOYVJQRIRROMPCQBLDYIGQO9AMORPYFSSUGACOJXGAQSPDY9YWRRPESNXXBDQ9OZOXVIOMLGTSWAMKMTDRSPGJKGBXQIVNRJRFRYEZ9VJDLHIKPSKMYC9YEGHFDS9SGVDHRIXBEMLFIINOHVPXIFAZCJKBHVMQZEVWCOSNWQRDYWVAIBLSCBGESJUIBWZECPUCAYAWMTQKRMCHONIPKJYYTEGZCJYCT9ABRWTJLRQXKMWY9GWZMHYZNWPXULNZAPVQLPMYQZCYNEPOCGOHBJUZLZDPIXVHLDMQYJUUBEDXXPXFLNRGIPWBRNQQZJSGSJTTYHIGGFAWJVXWL9THTPWOOHTNQWCNYOYZXALHAZXVMIZE9WMQUDCHDJMIBWKTYH9AC9AFOT9DPCADCV9ZWUTE9QNOMSZPTZDJLJZCJGHXUNBJFUBJWQUEZDMHXGBPTNSPZBR9TGSKVOHMOQSWPGFLSWNESFKSAZY9HHERAXALZCABFYPOVLAHMIHVDBGKUMDXC9WHHTIRYHZVWNXSVQUWCR9M9RAGMFEZZKZ9XEOQGOSLFQCHHOKLDSA9QCMDGCGMRYJZLBVIFOLBIJPROKMHOYTBTJIWUZWJMCTKCJKKTR9LCVYPVJI9AHGI9JOWMIWZAGMLDFJA9WU9QAMEFGABIBEZNNAL9OXSBFLOEHKDGHWFQSHMPLYFCNXAAZYJLMQDEYRGL9QKCEUEJ9LLVUOINVSZZQHCIKPAGMT9CAYIIMTTBCPKWTYHOJIIY9GYNPAJNUJ9BKYYXSV9JSPEXYMCFAIKTGNRSQGUNIYZCRT9FOWENSZQPD9ALUPYYAVICHVYELYFPUYDTWUSWNIYFXPX9MICCCOOZIWRNJIDALWGWRATGLJXNAYTNIZWQ9YTVDBOFZRKO9CFWRPAQQRXTPACOWCPRLYRYSJARRKSQPR9TCFXDVIXLP9XVL99ERRDSOHBFJDJQQGGGCZNDQ9NYCTQJWVZIAELCRBJJFDMCNZU9FIZRPGNURTXOCDSQGXTQHKHUECGWFUUYS9J9NYQ9U9P9UUP9YMZHWWWCIASCFLCMSKTELZWUGCDE9YOKVOVKTAYPHDF9ZCCQAYPJIJNGSHUIHHCOSSOOBUDOKE9CJZGYSSGNCQJVBEFTZFJ9SQUHOASKRRGBSHWKBCBWBTJHOGQ9WOMQFHWJVEG9NYX9KWBTCAIXNXHEBDIOFO9ALYMFGRICLCKKLG9FOBOX9PDWNQRGHBKHGKKRLWTBEQMCWQRLHAVYYZDIIPKVQTHYTWQMTOACXZOQCDTJTBAAUWXSGJF9PNQIJ9AJRUMUVCPWYVYVARKR9RKGOUHHNKNVGGPDDLGKPQNOYHNKAVVKCXWXOQPZNSLATUJT9AUWRMPPSWHSTTYDFAQDXOCYTZHOYYGAIM9CELMZ9AZPWB9MJXGHOKDNNSZVUDAGXTJJSSZCPZVPZBYNNTUQABSXQWZCHDQSLGK9UOHCFKBIBNETK',
       digest: '999999999999999999999999999999999999999999999999999999999999999999999999999999999',
       address: 'NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB',
       value: '0',
       timestamp: '1467664647',
       index: '3',
       bundle: 'NKZKEKWLDKMJCI9N9XQOLWEPAYW',
       signatureNonce: 'SH9999999999999999999999999',
       approvalNonce: 'KDDTGZLIPBNZKMLTOLOXQVNGLASESDQVPTXALEKRMIOHQLUHD9ELQDBQETS9QFGTYOYWLNTSKKMVJAUXS',
       trunkTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999',
       branchTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999'
     }
   ]
}
```

- **`hash`**: Transaction hash.
- **`type`**:  The type of transaction (-1 is spend, 1 is receive).
- **`signatureMessageChunk`**: Signature used for signing the transaction. If no signature was required for signing the transaction (e.g. a simple message), then it will contain the message value.
- **`digest`**: Hash digest of the transaction.
- **`address`**: Address of the recipient of this transaction.
- **`value`**: Value transferred.
- **`bundle`**: Bundle hash.
- **`signatureNonce`**: None used for generating the signature.
- **`approvalNonce`**: Nonce used for the Proof of Work.
- **`trunkTransaction`**: Trunk transaction which was referenced by this transaction.
- **`branchTransaction`**:  Branch transaction which was referenced by this transaction.

***

### `getNewAddress`

Generates a new address for your specified account (seed + securityLevel). The generation of the address itself is done deterministically, this means that you have to attach the newly generated address to the Tangle in order to get a new address. Else repeatedly calling `getNewAddress` will always generate the same address.

In order to attach the address to the tangle, all you have to do is send a transaction to the address: this can either be a transaction with value set to zero and an empty message (least amount of Proof of Work required), or a value transfer.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`seed` | string | Yes | Seed from which the transfer will be made and the specified value subtracted.
`securityLevel` | integer | Yes | The security level of the transaction.

**NodeJS request example**

```javascript
var request = require('request');

var command = {
  'command': 'getNewAddress',
  'seed': 'AAA999999999999999999999999999999999999999999999999999999999999999999999999999999',
  'securityLevel': 1
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
```

**Return Value**
```javascript
{
  address: 'KIXDAIGV9GH99ZKJNUHIWCVSBSQBZOYUCRUDL9YYTTCWPYCDEQHWECYFBPKOCICUFVEJBDQUKAOMXUFSB'
}
```

***

### `prepareTransfers`

Prepares the trytes (raw transaction data) for a list of transfers for a specified account. Each element in the `transfers` list needs to conform to the standard schema of a transaction. This means that the maximum `value` per transfer is `3812798742493` and the `message` field needs to be properly encoded into trytes.

Each transaction will output a new tryte value. These values can then be input into `attachToTangle`.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`seed` | string | Yes | Seed from which the transfer will be made and the specified value subtracted.
`address` | string | Yes | Recipient’s address.
`securityLevel` | integer | Yes | The security level of the transaction.
`transfers` | list | Yes | List of transactions, each element has address, value and message fields.

**NodeJS request example**

```javascript
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
```

**Return Value**
```javascript
{
  trytes:
   [ 'TRYTEVALUESHERE1', 'TRYTEVALUESHERE2' ]
}
```

***

### `getTransactionsToApprove`

Tip selection which returns `trunkTransaction` and `branchTransaction`. The input value is the latest coordinator `milestone`, as provided through the `getNodeInfo` API call.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`milestone` | string | Yes | Latest coordinator milestone

**NodeJS Example Request**

```javascript
var request = require('request');

var command = {
  'command': 'getTransactionsToApprove',
  'milestone': 'SMYMAKKPSUKCKDRUEYCGZJTYCZ9HHDMDUWBAPXARGURPQRHTAJDASRWMIDTPTBNDKDEFBUTBGGAFX9999'
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
```

**Return Value**
```javascript
{
  "trunkTransaction": "JVMTDGDPDFYHMZPMWEKKANBQSLSDTIIHAYQUMZOKHXXXGJHJDQPOMDOMNRDKYCZRUFZROZDADTHZC9999", "branchTransaction": "P9KFSJVGSPLXAEBJSHWFZLGP9GGJTIO9YITDEHATDTGAFLPLBZ9FOFWWTKMAZXZHFGQHUOXLXUALY9999"
}
```

***

### `attachToTangle`

Attaches the specified transactions (trytes) to the Tangle by doing Proof of Work. You need to supply `branchTransaction` as well as `trunkTransaction` (basically the tips which you're going to reference with this transaction) - both of which you'll get through the `getTransactionsToApprove` API call.

The returned value is a different set of tryte values which you can input into `pushTransactions` and `storeTransactions`. The returned tryte value, the last 243 trytes basically consist of the: `signatureNonce` + `trunkTransaction` + `branchTransaction`. These are valid trytes which you can then accepted by the network.

**NodeJS Example Request**

```javascript
var request = require('request');

var command = {
    'command': 'attachToTangle',
    'trunkTransaction': 'JVMTDGDPDFYHMZPMWEKKANBQSLSDTIIHAYQUMZOKHXXXGJHJDQPOMDOMNRDKYCZRUFZROZDADTHZC9999',
    'branchTransaction': 'P9KFSJVGSPLXAEBJSHWFZLGP9GGJTIO9YITDEHATDTGAFLPLBZ9FOFWWTKMAZXZHFGQHUOXLXUALY9999',
    'minWeightMagnitude': 13,
    'trytes': ['TRYTEVALUEHERE']
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

```

**Return Value**
```javascript
{'trytes':['TRYTEVALUEHERE']}
```

***


### `interruptAttachingToTangle`

Interrupts and completely aborts the `attachToTangle` process.

**Return value**
Nothing.


***

### `pushTransactions`

Broadcast a list of transactions to all neighbors.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`trytes` | list | Yes | List of raw data of transactions to be rebroadcast.

***

### `pullTransactions`

Request a set of transactions from your neighbors. This API call does not return anything, but if a neighbor has the transaction locally they will send it to you.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`hashes` | list | Yes | List of transaction hashes to request from your neighbors.

***

### `storeTransactions`

Store a list of transactions locally.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`trytes` | list | Yes | List of raw data of transactions to be stored.


***

### `transfer`

Makes an IOTA transfer. If the message field is non-empty and value is 0, the transfer becomes a simple message transfer. You can send send both a value transfer with accompanying data in the message field. The message value is publicly visible, so do not send any sensitive data through it. The max value is `2187 trytes`, which is 6561 trits (or roughly 1312 bytes) per transaction. This means that if your message value is longer than 2187 trytes, it will be automatically added in a second transaction..

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`seed` | string | Yes | Seed from which the transfer will be made and the specified value subtracted.
`address` | string | Yes | Recipient’s address.
`value` | string | Yes | Value to be transferred.
`message` | string, encoded in trinary | Yes, but can be left empty | Message value which will be added to the transaction.
`securityLevel` | integer | Yes | The security level of the transaction.
`minWeightMagnitude` | integer | Yes | Weight of PoW. Default value is 13.

**NodeJS request example**

```javascript
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
```

**Return Value**

- **`tail`**: Transaction hash of the transaction with index 0 in the bundle.

```javascript
{
	"tail":"BXMNQGX9FGRCWDYNGBNKOBVRZKHWNDZQSX9OVWMVRMMJIGLMBEIMZIMEKDZBFIPBYALKOQHAUZM9Z9999",
   "neighbors":7
}
```

***

### `replayTransfer`

Replay a previous transfer. Reason for doing this is either because your neighbors have not broadcast your transactions or because your transactions are left unconfirmed after a certain period of time (reason for that could be because you validated a subtangle with invalid transactions, thus your transfer will not be validated by other nodes). Only certain transactions can be replayed.

Replaying a transfer will completely redo the Proof of Work and newly positioned it in the Tangle.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`transaction` | string | Yes | Hash of the transaction which you want to replay.

**NodeJS request example**

```javascript
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
```

**Return Value**

Returns the number of neighbors the transactions were broadcast to.

```javascript
{
   "neighbors":7
}
```

***

# Workflow Examples
