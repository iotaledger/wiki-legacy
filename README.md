This is the temporary home of the documentation for the Java client. We will move to either Readme.io or Readthedocs soon.

# What is IOTA?

IOTA is a revolutionary new **transactional settlement** and **data transfer layer for the Internet of Things**. It’s based on a new distributed ledger, the Tangle, which gets rid off the inefficiencies of current Blockchain designs and introduces a new way of reaching consensus in a decentralized peer-to-peer system. For the first time ever, through IOTA people can transfer money without any fees. This means that even infinitesimally small nanopayments can be made through IOTA.

IOTA is the missing puzzle piece for the Machine Economy to fully emerge and reach its desired potential. We envision IOTA to be the public, permissionless backbone for the Internet of Things that enables true interoperability between all devices.
For a more thorough introduction about IOTA, please refer to ….

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

To-Do


Glossary
=================

Because IOTA introduces some rather new concepts to the Blockchain-space, we will list a couple of terms which are important to understand in order to fully grasp IOTA.

### Generic Terms

* DAG
* Distributed Ledger
* Blockchain
* Nodes
* Proof of Work
* Trinary:

### IOTA Specific Terms

* Tips: Unconfirmed transactions which have no other transactions referencing them.
* Tangle: A directed acyclic graph (DAG) as a distributed ledger which stores all transactions of the IOTA network. It is a Blockchain without the blocks and the chain (so is it really a Blockchain?). Read more about it here.
* Confirm/Validate:
* Branch/Trunk Transactions:
* Bundle:
* MAM:

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

#### Code examples

Please go to [this subdirectory](/examples/getNodeInfo/) for code examples.

### `getNeighborsActivity`

Returns the latest activity of your neighbors.

Please go to [this subdirectory](/examples/getNeighborsActivity/) for code examples.

### `getTips`

Returns the current list of visible tips (unconfirmed transactions).

Please go to [this subdirectory](/examples/getTips/) for code examples.

### `getTransfers`

Get a list of transfers from a certain account (seed).

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`seed` | string | Yes | Seed of a specified account. Has to be 81-chars encoded.
`securityLevel` | integer | Yes | SecurityLevel of your account and its transfers. A different securityLevel gives a different account.

### `findTransactions`

Find the transactions which match the specified input. All input values are transferred as lists, for which a list of return values, in the same order, is returned for all individual elements. The input fields can either be bundles, addresses, digests or approvees. Using multiple input fields returns the intersection of the values.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`bundles` | list | Optional | List of bundle hashes.
`addresses` | list | Optional | List of addresses.
`digests` | list | Optional | List of message digests.
`approvees` | list | Optional | List of approvee transaction hashes.

#### Returns

The return value depends on your input. For each specified input value, the command will return the following:

- **`bundles`**: returns the list of transactions which contain the specified bundle hash.
- **`addresses`**: returns the list of transactions which have the specified address as an input/output field.
- **`digests`**: returns the list of transactions which contain the specified digest value.
- **`approvees`**: returns the list of transaction which reference (i.e. confirm) the specified transaction.

### `getBundle`

Get the list of transactions which were bundled with a specific transaction.


Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`transaction` | string | Yes |Hash of a transaction.


#### Returns

- **`transactions`**


### `getTransactions`

Returns the raw data of a transaction (its trytes).

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`hashes` | list | Yes |List of transaction hashes of which you want to get the raw data from.

#### Returns

- **`trytes`**

### `analyzeTransactions`

Analyze a raw transaction and return its transaction object.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`trytes` | list | Yes | Raw data of a transaction.

### `transfer`

Makes an IOTA value transfer. If the message field is non-empty and value is 0, the transfer becomes a simple message transfer.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`seed` | string | Yes | Seed from which the transfer will be made and the specified value subtracted.
`address` | string | Yes | Recipient’s address.
`value` | string | Yes | Value to be transferred.
`message` | string, encoded in trinary | Yes, but can be left empty | Message value which will be added to the transaction.
`securityLevel` | integer | Yes | The security level of the transaction.
`minWeightMagnitude` | integer | Yes | Weight of PoW. Default value is 13.


#### Returns

- **`tail`**: Transaction hash of the transaction with index 0 in the bundle.

### `replayTransfer`

Replay a previous transfer. Reason for doing this is either because your neighbors have not replayed your transactions or because your transactions are left unconfirmed after a certain period of time (reason for that could be because you validated a subtangle with invalid transactions, thus your transfer will not be validated by other nodes).

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`transaction` | string | Yes | Hash of the transaction which you want to replay.

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

Broadcast a transaction to all neighbors.

Parameters | Type | Required | Description
------------ | ------------- | ------------- | -------------
`trytes` | list | Yes | Raw data of a transaction.

### `broadcastAllTransactions`

Broadcasts all transactions which are stored in the local node’s storage.
