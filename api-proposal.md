# IOTA API Library Proposal

Purpose of this page is to both, propose a uniform API design which the libraries interfacing with IRI conform to, as well as act as a general guidance for library developers so that they better understand what needs to be implemented. Interoperability is key in making the lives of developers as easy as possible, as such, all libraries should stick to a commonly-agreed design. This will also make development and maintenance for core developers easier.

> **Join the Discussion**

> This is an early proposal, as such, public discourse is incredibly important in ensuring that the design is sound and will be adopted by developers. For discussions related to this proposal, and more importantly, if you want to engage in these discussions, I suggest you to join our [Slack](http://slack.iotatoken.com/) so that we can discuss the design.

***

## Table of Contents		

  - **[Core API](#core-api)**
  - **[Crypto Functions](crypto-functions)**
  - **[Proposed API Calls](#proposed-api-calls)**
  - **[Questions](#questions)**

***

## Core API

In total there are 14 API calls which are available through IRI. You can get the full list from our API docs: [https://iota.readme.io/](https://iota.readme.io/).

## Crypto Functions

To be added

## Proposed API Calls

This is a list of new API calls which will help do just about anything possible with IOTA. These are mostly **wrapper functions**, this means that there will be more functions required in achieving the results. We leave it open for the developers of the libraries to develop this extra functionality (the result should be universally the same obviously).

### `prepareTransfers`

Main purpose of this function is to get an array of transfer objects as input, and then prepare the transfer by **generating the correct bundle**, as well as **choosing and signing the inputs** if necessary (if it's a value transfer). The output of this function is an array of the raw transaction data (trytes).

An example implementation can be viewed here: https://github.com/domschiener/nostalgia/blob/master/js/iotajs.js#L535

### Input
```
prepareTransfers(seed, transfersArray [, options] [, callback])
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`transfersArray`**: `Array` of transfer objects:
  - **`address`**: `String` 81-tryte encoded address of recipient
  - **`value`**: `Int` value to be transferred.
  - **`message`**: `String` tryte-encoded message to be included in the bundle.
  - **`tag`**: `String` 27-tryte encoded tag.
3. **`options`**: `Object` which is optional:
  - **`deterministic`**: `Bool` For choosing inputs, if true it chooses inputs deterministically. If false, it chooses the best input available. This will prevent double-spending inputs. **default: true**
  - **`address`**: `String` if defined, this address will be used for sending the remainder value (of the inputs) to.
  - **`encode`**: `Bool` if yes, it automatically encodes the `tag` and `message` value into trytes. This makes it possible to pass JSON objects and more through it.
4. **`callback`**: `Function` Optional callback.

#### Return Value

`Array` - an array that contains the trytes of the new bundle.

### `getNewAddress`

Generates a new address from a seed and returns the address. This is either done deterministically, or by providing the index of the new address (see Questions for more information about this).

### Input
```
getNewAddress(seed [, options] [, callback])
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`options`**: `Object` which is optional:
  - **`index`**: `Int` If the index is provided, the generation of the address is not deterministic.
  - **`checksum`**: `Bool` Adds 9-tryte address checksum
  - **`total`**: `Int` Total number of addresses to generate.
3. **`callback`**: `Function` Optional callback.

#### Returns
`String | Array` - returns either a string, or an array of strings.

### `getBundle`

This function returns the bundle which is associated with a transaction. Input can by any type of transaction (tail and non-tail). If there are conflicting bundles (because of a replay for example) it will return multiple bundles. It also does important validation checking (signatures, sum, order) to ensure that the correct bundle is returned.

### Input
```
getBundle(transaction [, callback])
```

1. **`transaction`**: `String` Transaction hash, can be tail or non-tail. Tail search is more specific and leads to more detailed results.
2. **`callback`**: `Function` Optional callback

#### Returns
`Array` - returns an array of arrays. Each array is a bundle, if there are multiple arrays it means that there are conflicting bundles.

### `getTransfers`

Returns the transfers which are associated with a seed. The transfers are determined by either calculating deterministically which addresses were already used, or by providing a list of indexes to get the transfers from.

### Input
```
getTransfers(seed [, options] [, callback])
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`options`**: `Object` which is optional:
  - **`indexes`**: `Array` - optional. If the index of addresses is provided, it will be used to get all transfers associated with the addresses.
  - **`inclusionStates`**: `Bool` If True, it gets the inclusion states of the transfers.
3. **`callback`**: `Function` Optional callback.

#### Returns
`Array` - returns an array of transfers. Each array is a bundle for the entire transfer.


### `replayTransfer`

Takes a tail transaction hash as input, gets the bundle associated with the transaction and then replays the bundle by attaching it to the tangle.

### Input
```
replayTransfer(transaction [, callback])
```

1. **`transaction`**: `String` Transaction hash, has to be tail.
2. **`callback`**: `Function` Optional callback

#### Returns
`Array` - returns an array containing the replayed transactions (bundle).

### `sendTransfer`

Wrapper function that basically does `prepareTransfers`, as well as `attachToTangle` and finally, it broadcasts and stores the transactions locally.

### Input
```
sendTransfer(seed, transferObject [, options] [, callback])
```

1. **`seed`** `String` tryte-encoded seed. If provided, will be used for signing and picking inputs.
2. **`transfersArray`**: `Array` of transfer objects:
  - **`address`**: `String` 81-tryte encoded address of recipient
  - **`value`**: `Int` value to be transferred.
  - **`message`**: `String` tryte-encoded message to be included in the bundle.
  - **`tag`**: `String` 27-tryte encoded tag.
3. **`options`**: `Object` which is optional:
  - **`deterministic`**: `Bool` For choosing inputs, if true it chooses inputs deterministically. If false, it chooses the best input available. This will prevent double-spending inputs. **default: true**
  - **`address`**: `String` if defined, this address will be used for sending the remainder value (of the inputs) to.
  - **`encode`**: `Bool` if yes, it automatically encodes the `tag` and `message` value into trytes. This makes it possible to pass JSON objects and more through it.
4. **`callback`**: `Function` Optional callback.


#### Returns
`Array` - returns an array of the transfer (transaction objects).

### `sendTrytes`

Wrapper function that does `attachToTangle` and finally, it broadcasts and stores the transactions locally.

### Input
```
sendTrytes(trytes [, callback])
```

1. **`trytes`** `Array` trytes
2. **`callback`**: `Function` Optional callback.

#### Returns
`Array` - returns an array of the transfer (transaction objects).


***

## Questions

1. For `prepareTransfers`, should the user be able to define the remainder address?
2. For `prepareTransfers`, should the user be able to define the inputs? (A problem is that the users of the libraries need to keep track of indexes of addresses.)
