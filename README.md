This is the temporary home of the documentation for the Java client. We will move to either Readme.io or Readthedocs soon.

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
    - **[`getNeighborsActivity`](#getneighborsactivity)**
    - **[`getTips`](#gettips)**
    - **[`getTransfers`](#gettransfers)**
    - **[`findTransactions`](#findtransactions)**
    - **[`getBundle`](#getbundle)**
    - **[`getTransactions`](#gettransactions)**
    - **[`analyzeTransactions`](#analyzetransactions)**
    - **[`transfer`](#transfer)**
    - **[`replayTransfer`](#replaytransfer)**
    - **[`generateNewAddress`](#generatenewaddress)**
    - **[`broadcastTransactions`](#broadcasttransactions)**
    - **[`broadcastAllTransactions`](#broadcastalltransactions)**

***

## Installation

For an easy to follow tutorial, please go to [http://necropaz.github.io/IOTAtutorial.html](http://necropaz.github.io/IOTAtutorial.html) More tutorials coming soon.

## Glossary

Because IOTA introduces some rather new concepts to the Blockchain-space, we will list a couple of terms which are important to understand in order to fully grasp IOTA.

### Generic Terms

* **`Peer to Peer Network`**: Decentralized network consisting of peers (or nodes) which are connected with each other and perform some form of data sharing with each other.
* **`Proof of Work`**: Algorithm which prevents Denial of Service and spam attacks on a network. Computationally hard puzzle, but easy to verify.
* **`Trinary`**: Alternative to binary, which consists of three states: 1, -1 and unknown.
* **`DAG`**: Directed Acyclic Graph. Is a specific data structure structure based on a graph without any directed cycles. Instead of having a single branch with nodes having only one edge, in a DAG there can be multiple branches. Refer to [Wikipedia](https://en.wikipedia.org/wiki/Directed_acyclic_graph) for more information.

### IOTA Specific Terms

* **`Tangle`**: A directed acyclic graph (DAG) as a distributed ledger which stores all transaction data of the IOTA network. It is a Blockchain without the blocks and the chain (so is it really a Blockchain?). The Tangle is the first distributed ledger to achieve **scalability**, **no fee transactions** as well as **quantum proof security**. Contrary to today’s Blockchains, consensus is no-longer decoupled but instead an intrinsic part of the system, leading to a decentralized and self-regulating peer-to-peer network.
* **`Seed`**: 81-char string consisting only of latin letters and 9's which is used to access an account. A seed is like a private key/password. Keep it secure and don't share it with anyone. If someone has access to your seed they can access your account.
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

CORS is disabled by default, this means that the only way to interface with a remote host is by setting up a gateway using nginx/Apache.

TO BE ADDED

### Errors

TO BE ADDED

### Fields

Here we list and describe all additional parameters which are required to be passed along for certain commands.

- **`seed`**: `string` 81-char encoded string which contains the accounts seed. The seed must be correctly encoded: only uppercase characters from the English Alphabet and 9’s. No other characters are allowed.  
- **`address`**: `string` 81-char long address of the recipient of a transaction.
value: string the quantity of IOTA’s which should be transferred.
- **`message`**: `string` tryte-encoded string which can contain arbitrary information and is sent alongside a transaction. The message value is publicly visible. The max value is 2187 trytes (or roughly 3028 bytes).
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

Please go to [this subdirectory](/examples/getNodeInfo/) for code examples.

```javascript
var request = require('request');

var command = {
    'command': 'getNodeInfo'
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

**Return value**

```javascript
{ appName: 'IRI',
  appVersion: '0.9.24.gamma',
  currentTime: 1467622143448,
  jreAvailableProcessors: 4,
  jreFreeMemory: 247711328,
  jreMaxMemory: 1908932608,
  jreTotalMemory: 1633681408,
  neighbors: 7,
  tips: 13174,
  transactionsToRequest: 0
}
```

***

### `getNeighborsActivity`

Returns the latest activity of your neighbors.

**NodeJS request example**

Please go to [this subdirectory](/examples/getNeighborsActivity/) for code examples.

```javascript
var request = require('request');

var command = {
    'command': 'getNeighborsActivity'
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

**Return value**

```javascript
{ neighbors:
   [ { node: '/8.8.8.8:14265',
       latestPacketSent: 1204,
       latestPacketReceived: 1222,
       nonSeenTransactions: 11,
       seenTransactions: 4484 },
     { node: '/8.8.8.8:14265',
       latestPacketSent: 2161863,
       latestPacketReceived: 2161875,
       nonSeenTransactions: 1,
       seenTransactions: 706 },
     { node: '/8.8.8.8:14265',
       latestPacketSent: 2169118,
       latestPacketReceived: 2169122,
       nonSeenTransactions: 4,
       seenTransactions: 1939 },
     { node: '/8.8.8.8:14265',
       latestPacketSent: 2209237,
       latestPacketReceived: 2209246,
       nonSeenTransactions: 5,
       seenTransactions: 3104 } ] }
```

***

### `getTips`

Returns the current list of visible tips (unconfirmed transactions).

**NodeJS example request**

Please go to [this subdirectory](/examples/getTips/) for code examples.

**Return value**


***

### `getTransfers`

Get a list of transfers from a certain account (seed).

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

**Return value**

The return value includes both, inbound and outbound transactions. The value field determines which type of transaction it is, as explained in the following table:

Value | Type of Transaction | Description
------------ | ------------- | -------------
negative | Send transaction | If the value is negative, it is a send/outbound transaction.
positive | Receive Transaction | If the value is above 0, then it is an incoming/receive transaction.
zero | Address generation | If the value is zero, then it's a transaction which generated and assigned a new address to your account. In this case, the `address` field is the newly generated address.

```javascript

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
{ hashes: [ 'ZJVYUGTDRPDYFGFXMKOTV9ZWSGFK9CFPXTITQLQNLPPG9YNAARMKNKYQO9GSCSBIOTGMLJUFLZWSY9999' ] }
```

***

### `getBundle`

Get the list of transactions which were bundled with the specified transaction. This call returns the full value of all individual transactions, not just the hashes.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`transaction` | string | Yes | Hash of a transaction.

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
       approvedTrunkTransaction: 'VLVNRHJNYQIXNVJVTVJHDKPNPBECKYLGZYMDHPJLGWHYSFCFUOSCRQGBJUZSZRJVAYJAFDZOBQCJA9999',
       approvedBranchTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999' },
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
       approvedTrunkTransaction: 'UWPITSAOKBQYHADDZHSDNTIUNETKLKFBDMRWKLJXSUOUZEUPICAGJWISEEAVLHGLHUUMJYZBKQW9C9999',
       approvedBranchTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999' },
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
       approvedTrunkTransaction: 'OAATQS9VQLSXCLDJVJJVYUGONXAXOFMJOZNSYWRZSWECMXAQQURHQBJNLD9IOFEPGZEPEMPXCIVRX9999',
       approvedBranchTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999' },
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
       approvedTrunkTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999',
       approvedBranchTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999'
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
{ trytes: [ 'BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUSDXZHOFHWHL9MQPVJXXZLIXPXPXF9KYEREFSKCPKYIIKPZVLHUTDFQKKVVBBN9ATTLPCNPJDWDEVIYYLGPZGCWXOBDXMLJC9VO9QXTTBLAXTTBFUAROYEGQIVB9MJWJKXJMCUPTWAUGFZBTZCSJVRBGMYXTVBDDS9MYUJCPZ9YDWWQNIPUAIJXXSNLKUBSCOIJPCLEFPOXFJREXQCUVUMKSDOVQGGHRNILCO9GNCLWFM9APMNMWYASHXQAYBEXF9QRIHIBHYEJOYHRQJAOKAQ9AJJFQ9WEIWIJOTZATIBOXQLBMIJU9PCGBLVDDVFP9CFFSXTDUXMEGOOFXWRTLFGV9XXMYWEMGQEEEDBTIJ9OJOXFAPFQXCDAXOUDMLVYRMRLUDBETOLRJQAEDDLNVIRQJUBZBO9CCFDHIX9MSQCWYAXJVWHCUPTRSXJDESISQPRKZAFKFRULCGVRSBLVFOPEYLEE99JD9SEBALQINPDAZHFAB9RNBH9AZWIJOTLBZVIEJIAYGMC9AZGNFWGRSWAXTYSXVROVNKCOQQIWGPNQZKHUNODGYADPYLZZZUQRTJRTODOUKAOITNOMWNGHJBBA99QUMBHRENGBHTH9KHUAOXBVIVDVYYZMSEYSJWIOGGXZVRGN999EEGQMCOYVJQRIRROMPCQBLDYIGQO9AMORPYFSSUGACOJXGAQSPDY9YWRRPESNXXBDQ9OZOXVIOMLGTSWAMKMTDRSPGJKGBXQIVNRJRFRYEZ9VJDLHIKPSKMYC9YEGHFDS9SGVDHRIXBEMLFIINOHVPXIFAZCJKBHVMQZEVWCOSNWQRDYWVAIBLSCBGESJUIBWZECPUCAYAWMTQKRMCHONIPKJYYTEGZCJYCT9ABRWTJLRQXKMWY9GWZMHYZNWPXULNZAPVQLPMYQZCYNEPOCGOHBJUZLZDPIXVHLDMQYJUUBEDXXPXFLNRGIPWBRNQQZJSGSJTTYHIGGFAWJVXWL9THTPWOOHTNQWCNYOYZXALHAZXVMIZE9WMQUDCHDJMIBWKTYH9AC9AFOT9DPCADCV9ZWUTE9QNOMSZPTZDJLJZCJGHXUNBJFUBJWQUEZDMHXGBPTNSPZBR9TGSKVOHMOQSWPGFLSWNESFKSAZY9HHERAXALZCABFYPOVLAHMIHVDBGKUMDXC9WHHTIRYHZVWNXSVQUWCR9M9RAGMFEZZKZ9XEOQGOSLFQCHHOKLDSA9QCMDGCGMRYJZLBVIFOLBIJPROKMHOYTBTJIWUZWJMCTKCJKKTR9LCVYPVJI9AHGI9JOWMIWZAGMLDFJA9WU9QAMEFGABIBEZNNAL9OXSBFLOEHKDGHWFQSHMPLYFCNXAAZYJLMQDEYRGL9QKCEUEJ9LLVUOINVSZZQHCIKPAGMT9CAYIIMTTBCPKWTYHOJIIY9GYNPAJNUJ9BKYYXSV9JSPEXYMCFAIKTGNRSQGUNIYZCRT9FOWENSZQPD9ALUPYYAVICHVYELYFPUYDTWUSWNIYFXPX9MICCCOOZIWRNJIDALWGWRATGLJXNAYTNIZWQ9YTVDBOFZRKO9CFWRPAQQRXTPACOWCPRLYRYSJARRKSQPR9TCFXDVIXLP9XVL99ERRDSOHBFJDJQQGGGCZNDQ9NYCTQJWVZIAELCRBJJFDMCNZU9FIZRPGNURTXOCDSQGXTQHKHUECGWFUUYS9J9NYQ9U9P9UUP9YMZHWWWCIASCFLCMSKTELZWUGCDE9YOKVOVKTAYPHDF9ZCCQAYPJIJNGSHUIHHCOSSOOBUDOKE9CJZGYSSGNCQJVBEFTZFJ9SQUHOASKRRGBSHWKBCBWBTJHOGQ9WOMQFHWJVEG9NYX9KWBTCAIXNXHEBDIOFO9ALYMFGRICLCKKLG9FOBOX9PDWNQRGHBKHGKKRLWTBEQMCWQRLHAVYYZDIIPKVQTHYTWQMTOACXZOQCDTJTBAAUWXSGJF9PNQIJ9AJRUMUVCPWYVYVARKR9RKGOUHHNKNVGGPDDLGKPQNOYHNKAVVKCXWXOQPZNSLATUJT9AUWRMPPSWHSTTYDFAQDXOCYTZHOYYGAIM9CELMZ9AZPWB9MJXGHOKDNNSZVUDAGXTJJSSZCPZVPZBYNNTUQABSXQWZCHDQSLGK9UOHCFKBIBNETK999999999999999999999999999999999999999999999999999999999999999999999999999999999NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB999999999XKBRHUD99C99999999NKZKEKWLDKMJCI9N9XQOLWEPAYWSH9999999999999999999999999KDDTGZLIPBNZKMLTOLOXQVNGLASESDQVPTXALEKRMIOHQLUHD9ELQDBQETS9QFGTYOYWLNTSKKMVJAUXSIROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999' ] }
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
  'hashes': ['BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUSDXZHOFHWHL9MQPVJXXZLIXPXPXF9KYEREFSKCPKYIIKPZVLHUTDFQKKVVBBN9ATTLPCNPJDWDEVIYYLGPZGCWXOBDXMLJC9VO9QXTTBLAXTTBFUAROYEGQIVB9MJWJKXJMCUPTWAUGFZBTZCSJVRBGMYXTVBDDS9MYUJCPZ9YDWWQNIPUAIJXXSNLKUBSCOIJPCLEFPOXFJREXQCUVUMKSDOVQGGHRNILCO9GNCLWFM9APMNMWYASHXQAYBEXF9QRIHIBHYEJOYHRQJAOKAQ9AJJFQ9WEIWIJOTZATIBOXQLBMIJU9PCGBLVDDVFP9CFFSXTDUXMEGOOFXWRTLFGV9XXMYWEMGQEEEDBTIJ9OJOXFAPFQXCDAXOUDMLVYRMRLUDBETOLRJQAEDDLNVIRQJUBZBO9CCFDHIX9MSQCWYAXJVWHCUPTRSXJDESISQPRKZAFKFRULCGVRSBLVFOPEYLEE99JD9SEBALQINPDAZHFAB9RNBH9AZWIJOTLBZVIEJIAYGMC9AZGNFWGRSWAXTYSXVROVNKCOQQIWGPNQZKHUNODGYADPYLZZZUQRTJRTODOUKAOITNOMWNGHJBBA99QUMBHRENGBHTH9KHUAOXBVIVDVYYZMSEYSJWIOGGXZVRGN999EEGQMCOYVJQRIRROMPCQBLDYIGQO9AMORPYFSSUGACOJXGAQSPDY9YWRRPESNXXBDQ9OZOXVIOMLGTSWAMKMTDRSPGJKGBXQIVNRJRFRYEZ9VJDLHIKPSKMYC9YEGHFDS9SGVDHRIXBEMLFIINOHVPXIFAZCJKBHVMQZEVWCOSNWQRDYWVAIBLSCBGESJUIBWZECPUCAYAWMTQKRMCHONIPKJYYTEGZCJYCT9ABRWTJLRQXKMWY9GWZMHYZNWPXULNZAPVQLPMYQZCYNEPOCGOHBJUZLZDPIXVHLDMQYJUUBEDXXPXFLNRGIPWBRNQQZJSGSJTTYHIGGFAWJVXWL9THTPWOOHTNQWCNYOYZXALHAZXVMIZE9WMQUDCHDJMIBWKTYH9AC9AFOT9DPCADCV9ZWUTE9QNOMSZPTZDJLJZCJGHXUNBJFUBJWQUEZDMHXGBPTNSPZBR9TGSKVOHMOQSWPGFLSWNESFKSAZY9HHERAXALZCABFYPOVLAHMIHVDBGKUMDXC9WHHTIRYHZVWNXSVQUWCR9M9RAGMFEZZKZ9XEOQGOSLFQCHHOKLDSA9QCMDGCGMRYJZLBVIFOLBIJPROKMHOYTBTJIWUZWJMCTKCJKKTR9LCVYPVJI9AHGI9JOWMIWZAGMLDFJA9WU9QAMEFGABIBEZNNAL9OXSBFLOEHKDGHWFQSHMPLYFCNXAAZYJLMQDEYRGL9QKCEUEJ9LLVUOINVSZZQHCIKPAGMT9CAYIIMTTBCPKWTYHOJIIY9GYNPAJNUJ9BKYYXSV9JSPEXYMCFAIKTGNRSQGUNIYZCRT9FOWENSZQPD9ALUPYYAVICHVYELYFPUYDTWUSWNIYFXPX9MICCCOOZIWRNJIDALWGWRATGLJXNAYTNIZWQ9YTVDBOFZRKO9CFWRPAQQRXTPACOWCPRLYRYSJARRKSQPR9TCFXDVIXLP9XVL99ERRDSOHBFJDJQQGGGCZNDQ9NYCTQJWVZIAELCRBJJFDMCNZU9FIZRPGNURTXOCDSQGXTQHKHUECGWFUUYS9J9NYQ9U9P9UUP9YMZHWWWCIASCFLCMSKTELZWUGCDE9YOKVOVKTAYPHDF9ZCCQAYPJIJNGSHUIHHCOSSOOBUDOKE9CJZGYSSGNCQJVBEFTZFJ9SQUHOASKRRGBSHWKBCBWBTJHOGQ9WOMQFHWJVEG9NYX9KWBTCAIXNXHEBDIOFO9ALYMFGRICLCKKLG9FOBOX9PDWNQRGHBKHGKKRLWTBEQMCWQRLHAVYYZDIIPKVQTHYTWQMTOACXZOQCDTJTBAAUWXSGJF9PNQIJ9AJRUMUVCPWYVYVARKR9RKGOUHHNKNVGGPDDLGKPQNOYHNKAVVKCXWXOQPZNSLATUJT9AUWRMPPSWHSTTYDFAQDXOCYTZHOYYGAIM9CELMZ9AZPWB9MJXGHOKDNNSZVUDAGXTJJSSZCPZVPZBYNNTUQABSXQWZCHDQSLGK9UOHCFKBIBNETK999999999999999999999999999999999999999999999999999999999999999999999999999999999NOXDXXKUDWLOFJLIPQIBRBMGDYCPGDNLQOLQS99EQYKBIU9VHCJVIPFUYCQDNY9APGEVYLCENJIOBLWNB999999999XKBRHUD99C99999999NKZKEKWLDKMJCI9N9XQOLWEPAYWSH9999999999999999999999999KDDTGZLIPBNZKMLTOLOXQVNGLASESDQVPTXALEKRMIOHQLUHD9ELQDBQETS9QFGTYOYWLNTSKKMVJAUXSIROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999']
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
       approvedTrunkTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999',
       approvedBranchTransaction: 'IROUICDOXKSYZTDPEDKOQENTJOWJONDEWROCEJIEWFWLUAACVSJFTMCHHXJBJRKAAPUDXXVXFWP9X9999'
     }
   ]
}
```

***

### `transfer`

Makes an IOTA value transfer. If the message field is non-empty and value is 0, the transfer becomes a simple message transfer. You can send send a value transfer with accompanying data.

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

### `generateNewAddress`

Generates a new address for a specified seed.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`seed` | string | Yes | Seed of a specified account. Has to be 81-chars encoded.
`securityLevel` | integer | Yes | Security level of the address you want to generate. Can take values 0, 1, or 2
`minWeightMagnitude` | integer | Yes | Weight of Proof of Work. Can only take value 13

#### Returns

- **`address`**

### `broadcastTransactions`

Broadcast a list of transactions to all neighbors.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`trytes` | list | Yes | List of raw data of transactions to be rebroadcast.

### `broadcastAllTransactions`

Broadcasts all transactions which are stored in the local node’s storage.
