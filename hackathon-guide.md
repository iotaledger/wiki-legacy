# IOTA Hackathon Guide

This guide is aimed at helping hackathon participants who want to use IOTA, but have no prior experience with it, to quickly dive into it and start developing. It's scarce on information and only focuses on what matters (to win the Hackathon ;)). Enough introduction, lets dive into it.


---

## Table of Contents

- **[What is IOTA](#what-is-iota)**
- **[Glossary of Terms](#glossary-of-terms)**
- **[Transactions and Bundles](#transactions-and-bundles)**
- **[The IOTA Sandbox](#the-iota-sandbox)**
- **[Libraries to use](#libraries-to-use)**
- **[Using Nostalgia](#using-nostalgia)**
- **[Workflow](#workflow)**
    - **[Important API Calls](#important-api-calls)**
    - **[Generating an Address](#generating-an-address)**
    - **[Making a transfer](#make-a-transfer)**
    - **[Sending data](#sending-data)**


---

## What is IOTA

IOTA is a permissionless and public distributed ledger based on the Tangle, which is a Directed Acyclic Graph. IOTA has a very unique approach to consensus: instead of requiring miners to do the consensus, network participants making transactions actively participate in the consensus by **validating two past transactions** (and doing some Proof of work). Because of this, IOTA has **no transaction fees** (we also have some other advantages like quantum-security, partition-tolerance and scalability, but that doesn't matter to your right now). Obviously IOTA also has an internal token called IOTA.

For more documentation head to: [https://iota.readme.io/docs/findtransactions](https://iota.readme.io/docs/findtransactions)

---

## Glossary of Terms

* **`Trytes and Trits`**: IOTA is based on trinary instead of binary (long story). The way we represent trytes is in uppercase latin letters and the number 9 (`[9A-Z]`). So whenever we speak about *tryte-encoded*, you know that it's a string that only contains 9A-Z (e.g. 'ABFDSGFDS9').
* **`Seed`**: String consisting only of uppercase latin letters and 9's (`[9A-Z]`) which is used to deterministically generate private keys with. The maximum length for seed is 81-trytes (81 chars).
* **`Tips`**: transactions which have no other transactions referencing them.
* **`Confirm/Validate`**: In order to broadcast a new transaction in IOTA, you must first validate two previous transactions. This confirmation happens by validating the transaction trytes, the signatures and cross-checking for conflicting transactions as well as the completion of a Proof of Work puzzle.
* **`Branch/Trunk Transactions`**: Two transactions which were referenced and validated by another transaction.
* **`Bundle`**: Transactions which are bundled (or grouped) together during the creation of a transfer.

---

## Transactions and Bundles

A transaction in IOTA consists of 2673 trytes (if encoded). When you decode the trytes you get a transaction object which has the following values:

* **`hash`**: `String` 81-trytes unique hash value of this transaction
* **`signatureMessageFragment`**: `String` 2187-trytes signature message fragment. In case there is a spent input, the signature of the private key is stored here. If no signature is required, it is empty (all 9's) and can be used for storing the `message` value when making a transfer. More to that later.
* **`address`**: `String` 81-trytes address. In case this is an *output*, then this is the address of the recipient. In case it is an *input*, then it is the address of the input which is used to send the tokens from.
* **`value`**: `Int` value transferred in this transaction
* **`timestamp`**: `Int` timestamp
* **`currentIndex`**: `Int` the index of this transaction in the bundle.
* **`lastIndex`**: `Int` the total number of transactions present in the bundle
* **`bundle`**: `String` 81-tryte bundle hash, which is used for grouping transactions of the bundle together
* **`trunkTransaction`**: `String` 81-trytes hash (not important for you)
* **`branchTransaction`**: `String` 81-trytes hash (not important for you)
* **`nonce`**: `String` 81-trytes hash (not important for you)


Here is an example of what such a transaction in raw tryte format looks like:

```
999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999A9RGRKVGWMWMKOLVMDFWJUHNUNYWZTJADGGPZGXNLERLXYWJE9WQHWWBMCPZMVVMJUMWWBLZLNMLDCGDJ999999999999999999999999999999999999999999999999999999YGYQIVD99999999999999999999TXEFLKNPJRBYZPORHZU9CEMFIFVVQBUSTDGSJCZMBTZCDTTJVUFPTCCVHHORPMGCURKTH9VGJIXUQJVHK999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
```

And here is the same transaction object (you can try and convert this yourself, with `iota.utils.transactionObject()`):

```
{
    "hash":"IPQYUNLDGKCLJVEJGVVISSQYVDJJWOXCW9RZXIDFKMBXDVZDXFBZNZJKBSTIMBKAXHFTGETEIPTZGNTJK",
    "signatureMessageFragment":"999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "address":"A9RGRKVGWMWMKOLVMDFWJUHNUNYWZTJADGGPZGXNLERLXYWJE9WQHWWBMCPZMVVMJUMWWBLZLNMLDCGDJ",
    "value":0,
    "tag":"999999999999999999999999999",
    "timestamp":1482522289,
    "currentIndex":0,
    "lastIndex":0,
    "bundle":"TXEFLKNPJRBYZPORHZU9CEMFIFVVQBUSTDGSJCZMBTZCDTTJVUFPTCCVHHORPMGCURKTH9VGJIXUQJVHK",
    "trunkTransaction":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "branchTransaction":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "nonce":"999999999999999999999999999999999999999999999999999999999999999999999999999999999"
}

```

IOTA uses a UTXO-like scheme. This means that we have inputs (addresses) which you have to spend in order to transact tokens. Addresses are generated from private keys, which in turn are derived from a tryte-encoded seed. A transaction in IOTA is a bundle consisting of outputs and inputs. A typical transfer in IOTA is a bundle consisting of 4 transactions:

Index | Purpose | Balance
--- | :---: | ---
0 | Output. Defines where the tokens are of the input are sent to. | >0 (as defined)
1 | First bundle entry that spends the entirety of the address input. This bundle entry also contains the first part of the signature (in the example case, it'll be the first half of **Alice's signature**) | < 0 (spending of input)
2 | Second half of **Alice's signature** | 0
3 | Output, where remainder is sent to | >0 (input - output)

---

## The IOTA Sandbox

To make your life at this hackathon easy and you can focus on what matters (building your application), we have made available a Sandbox environment, which basically takes care of all the heavy-lifting for you. As such, you can use IOTA by simply making an HTTP(s) call to our sandbox, and that's it. **Obviously, you shouldn't stresstest the Sandbox and spam it with requests...**

For more documentation on the Sandbox, please head over to: [http://dev.iotatoken.com/sandbox/](http://dev.iotatoken.com/sandbox/)

All you really have to do is get an API key and use the Sandbox as the API provider. Here is an example on how to use the Sandbox with the Javascript library:

```
// Create IOTA instance with host and port as provider
var iota = new IOTA({
    'provider'  : 'https://sandbox.iotatoken.com/api/v1/',
    'sandbox'   :  true,
    'token'     : 'EXAMPLE-TOKEN-HERE'
});
```

---

## Libraries to Use

The most mature library is the Javascript library, followed by Java and Python. We suggest you to use one of these libraries for the hackathon.

Language | Link | Maturity
--- | --- | ---
Javascript | [https://github.com/iotaledger/iota.lib.js](https://github.com/iotaledger/iota.lib.js) | High
Python | [https://github.com/iotaledger/iota.lib.py](https://github.com/iotaledger/iota.lib.py) | Good
Java | [https://github.com/pinpong/iota.lib.java/](https://github.com/pinpong/iota.lib.java/) | Good

---

## Using Nostalgia

We have provided a special nostalgia version for you with additional logging that is already enabled for the sandbox. Feel free to use Nostalgia in order to check the balance of a seed, make a transaction or execute API calls in the Browser console.

You can download the special nostalgia version from here: [https://github.com/domschiener/nostalgia/releases/tag/sandbox](https://github.com/domschiener/nostalgia/releases/tag/sandbox)

![alt text](./images/nostalgia.png)

---

## Workflow Examples

### Important API Calls

Here is a list of API calls which you will most likely only need for your hackathon (these are function names from the Javascript library, so they may be different in the other libraries ):

Function | Purpose
--- | ---
`api.findTransactions` | Find the transaction hashes of transactions that match a certain criteria (e.g. address, bundle hash)
`api.getTrytes` | Get the trytes from a transaction hash
`api.getBalances` | Get the confirmed balance of an address
`api.getLatestInclusion` | Get the transaction confirmation status of a transaction  
`api.findTransactionObjects` | Wrapper of findTransactions and transactionObject
`api.getNewAddress` | Generate a new address from a seed
`api.sendTransfer` | Send a transaction
`api.getTransfers` | Get a list of transactions associated with a seed (account)
`utils.transactionObject` | Turn trytes into transaction object
`utils.transactionTrytes` | Turn transaction object into trytes

---

### Generating an Address

Generating an address requires you to simply have a seed. With the `getNewAddress` function you are able to deterministically generate new addresses. In case you want to go more low level, you can define the key `index` yourself in order to generate a seed at a certain private key index (starting from 0). You can also add the `checksum` to your address or even generate a set of addresses by defining `index` and `total`.

```
// Generate a single address deterministically with seed 'ABCDFG'
iota.api.getNewAddress('ABCDFG', function(e, address) {
    console.log(address) // 'UMCIPFQZECSQFGAPTJXBMESJDXRQLETKHIVQKUNTLKPFCDABIIAAFMRCA9NGMKPNYPJXILNEXSSLOWNJC'
})


// Generate 5 addresses starting from index 0
iota.api.getNewAddress('ABCDFG', {'index':0, 'total': 5}, function(e, addresses) {
    console.log(addresses)

    // Result:
    ["UMCIPFQZECSQFGAPTJXBMESJDXRQLETKHIVQKUNTLKPFCDABIIAAFMRCA9NGMKPNYPJXILNEXSSLOWNJC",
    "GWXMZADCDEWEAVRKTAIWOGE9RDX9QPKJHPPQ9IDDOINY9TUWJGKCWF9GSOW9QBPNRVSVFLBMLPAHWDNSB",
    "9TZEPOCR9QJCAXUWMBMSXVQIZDTZDCRIPXIQMGXN9JTJAIYDEDPISXKNFESWX9WTUYNAKHRLX9KBSQYTG",
    "9YUGWDGAGF9KFCFHMSYLLGQQFPBSYJPLHFXYFCJUHKFARJBKSIIUEPBEBBEBBDJRKI9OIAKXBWJNL9AKY",
    "LMEKJPPV9PFCVGHIPCIVUGNBEBPKRAZLKPCGYUXWB9FUVSJIHYJYGGLUCKXCOTXMEGMWBVWPWQZLDQLNV"]
})
```

getAccountData and getTransfers only gets addresses that are generated **deterministically** with the seed. (unless you provide key index `start` and `end`, as per the API docs). Generating an address in IOTA also involves actually sending a transaction with the address in order to attach it to the tangle. Once an address has been attached to the tangle (and findTransactions on that address does not return null), the key index used to generate private keys from a seed is increased to generate a new address, and get all associated transactions with the previous one. Pretty simple concept.

Therefore, in order to continue to generate addresses, you actually have to *attach them to the tangle*. What this means is that you have to use the `sendTransfer` function after generating an address, send a message (0 value transfer) and wait for the transaction to be successfully attached. See *Making a Transfer* section for more information. Here is an example:

```
// Generate a single address deterministically with seed 'ABCDFG'
iota.api.getNewAddress('ABCDFG', function(e, address) {

    console.log(address) // 'UMCIPFQZECSQFGAPTJXBMESJDXRQLETKHIVQKUNTLKPFCDABIIAAFMRCA9NGMKPNYPJXILNEXSSLOWNJC'

    var transfer = [{
        'address': address,
        'value': 0
    }]

    iota.api.sendTransfer('SEED', 9, 18, transfer, function(e,s) {

        if (!e) {
            console.log("Successfully generated and attached address");
        }
    })
})

```

### Making a Transfer

Making a transfer through the Sandbox and the library is fairly simple. Usually when talking about transfers, there are two types:

- **Value Transfers**: Transfers which send tokens from one address to another and require signatures
- **Message transfers**: Transfers which don't require a signature and have no value transfer

In order to make a value transfer, you obviously need to have a *seed* which has tokens associated with it. Use Nostalgia as a sure-way to know whether a seed has tokens or not.

Every transfer requires a transfers object (or lets say, an array of objects). With this you can also make multiple transfers and bundle them together in a single transfer. You do not have to define `message` and `tag`.

```
var transfers = [{
    'address': '' // Recipient address
    'value': 0 // value to be transferred
    'message': '' // message to be stored in the signatureMessageFragment of transaction
    'tag': '' // unique tag that can be used to tag all transactions in a bundle
}]
```

When it comes to `depth` and `minWeightMagnitude`, we advise you to use `3` as a standard value for `depth`, and `18` as a standard value for `minWeightMagnitude`.

```
//
var transfer = [{
    'address': 'UMCIPFQZECSQFGAPTJXBMESJDXRQLETKHIVQKUNTLKPFCDABIIAAFMRCA9NGMKPNYPJXILNEXSSLOWNJC',
    'value': 0
}]

iota.api.sendTransfer('SEED', 9, 18, transfer, function(e,s) {

    if (!e) {
        console.log("Successfully made a transfer ");
    }
})
```

### Sending data

When sending data via IOTA, you currently only have two options: as part of the `message` field, where you have unlimited space but have no search functionality, or as part of the `tag` field, where you only have 27 trytes of space.
