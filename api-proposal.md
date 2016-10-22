# IOTA API Library Proposal

Purpose of this page is to both, propose a uniform API design which the libraries interfacing with IRI conform to, as well as act as a general guidance for library developers so that they better understand what needs to be implemented. Interoperability is key in making the lives of developers as easy as possible, as such, all libraries should stick to a commonly-agreed design. This will also make development and maintenance for core developers easier. 

> **Join the Discussion**

> This is an early proposal, as such, public discourse is incredibly important in ensuring that the design is sound and will be adopted by developers. For discussions related to this proposal, and more importantly, if you want to engage in these discussions, I suggest you to join our [Slack](http://slack.iotatoken.com/) so that we can discuss the design. 

***

## Table of Contents		
	
  - **[Core API](#core-api)**
  - **[Curl Functions](curl-functions)**
  - **[Proposed API Calls](#proposed-api-calls)**
  
***
  
## Core API

In total there are 14 API calls which are available through IRI. You can get the full list from our API docs: [https://iota.readme.io/](https://iota.readme.io/).

## Curl Functions

To be added

## Proposed API Calls

This is a list of new API calls which will help do just about anything possible with IOTA. These are mostly **wrapper functions**, this means that there will be more functions required in achieving the results. We leave it open for the developers of the libraries to develop this extra functionality (the result should be universally the same obviously). 

### `prepareTransfers`

Main purpose of this function is to get a transfer object as input, and then prepare the transfer by generating the correct bundle, as well as signing the inputs if necessary (if it's a value transfer). The output of this function is the raw transaction data (trytes). 

#### Input
```
prepareTransfers(seed, transfersArray [, options] [, callback])
```

1. **`seed`**: `String` tryte-encoded seed. It should be noted that this seed is not transferred
2. **`transfersArray`**: `Array` of transfer objects:
  - **`address`**: `String` 81-tryte encoded address of recipient 
  - **`Value`**: `Int` value to be transferred.
  - **`message`**: `String` tryte-encoded message to be included in the bundle.
  - **`tag`**: `String` 27-tryte encoded tag. 
3. **`options`**: `Object` which is optional:
  - **`deterministic`**: `Bool` For choosing inputs, if true it chooses inputs deterministically. If false, it chooses the best input available. This will prevent double-spending inputs. 
  - **`encode`**: `Bool` if yes, it automatically encodes the `tag` and `message` value into trytes. This makes it possible to pass JSON objects and more through it. 
4. **`callback`**: `Function` Optional callback. 
