/**
  *
  *   jQuery Example: How to generate and attach an address to the Tangle with the IOTA API
  *                   This example generate a new address, attaches it to the Tangle through
  *                   an empty transaction as well as broadcasts and stores the transaction.
  *
  *   API Calls used:
  *          - getNewAddress
  *          - getNodeInfo
  *          - getTransactionsToApprove
  *          - prepareTransfers
  *          - attachToTangle
  *          - broadcastTransactions
  *          - storeTransactions
  *
**/




/**
  *   Your private seed with which you want to generate an address.
  **/
var SEED = 'RCWHBLWDXNQNABGMKOSGKSWRPOVGNAGBZBOSWS9SO9SE9UVH9TOOPCJDAOQFWVLFP9M99TRQGEKVUURPV'

/**
  *   IOTA API Call to generate a new address from a private key (provided by the seed)
  *   Makes an Ajax request and returns the Deferred object
**/
var getNewAddress = function() {

  var command = {
    'command': 'getNewAddress',
    'securityLevel': 1,
    'seed': SEED
  }

  var options = {
    type: "POST",
    url: "http://localhost:14265",
    data: JSON.stringify(command)
  };

  return $.ajax(options);
}

/**
  *   Get the latest information of your node, as well as the network. For us the `milestoneIndex` is of
  *   importance. It will later be used to fetch the tips to confirm.
**/
var getNodeInfo = function() {

  var command = {
    'command': 'getNodeInfo'
  }

  var options = {
    type: "POST",
    url: "http://localhost:14265",
    data: JSON.stringify(command)
  };

  return $.ajax(options);
}

/**
  *   Gets the latest coordinator milestone.
  *   @param {string} milestoneIndex (Provided by getNodeInfo API call)
**/
var getMilestone = function(milestoneIndex) {

  var command = {
    'command': 'getMilestone',
    'index': milestoneIndex
  }

  var options = {
    type: "POST",
    url: "http://localhost:14265",
    data: JSON.stringify(command)
  };

  return $.ajax(options);
}

/**
  *   Gets the branch and trunk transaction (tips) which need to be approved by our transaction.
  *   @param {string} milestone (Provided by getNodeInfo API call).
**/
var getTxToApprove = function(milestone) {

  var command = {
    'command': 'getTransactionsToApprove',
    'milestone': milestone
  }

  var options = {
    type: "POST",
    url: "http://localhost:14265",
    data: JSON.stringify(command)
  };

  return $.ajax(options);
}

/**
  *   Prepare the trytes (raw transaction data) for an empty message which will
  *   be sent to our address in order to attach it to the Tangle
  *   @param {string} address (provided by getNewAddress API call).
**/
var prepareTransfers = function(address) {

  var command = {
    'command': 'prepareTransfers',
    'seed': '999999999999999999999999999999999999999999999999999999999999999999999999999999999',
    'securityLevel': 1,
    'transfers': [{
      'value': '0',
      'message': '',
      'address': address
    }]
  }

  var options = {
    type: "POST",
    url: "http://localhost:14265",
    data: JSON.stringify(command)
  };

  return $.ajax(options);
}

/**
  *   Attaches the empty message transaction to the Tangle by doing the Proof of Work
  *   and validating the branch and trunk transactions, as well as the subtangle.
  *   @param {string} branchTx (provided by getTransactionsToApprove API Call)
  *   @param {string} trunkTx (provided by getTransactionsToApprove API Call)
  *   @param {array} trytes (provided by prepareTransfers API Call)
**/
var attachToTangle = function(branchTx, trunkTx, trytes) {

  var command = {
    'command': 'attachToTangle',
    'seed': '999999999999999999999999999999999999999999999999999999999999999999999999999999999',
    'branchTransactionToApprove': branchTx,
    'trunkTransactionToApprove': trunkTx,
    'minWeightMagnitude': 13,
    'trytes': trytes
  }

  var options = {
    type: "POST",
    url: "http://localhost:14265",
    data: JSON.stringify(command)
  };

  return $.ajax(options);
}

/**
  *   Broadcast the successfully generated and attached transaction to all neighbors
  *   @param {array} trytes (provided by attachToTangle API Call)
**/
var broadcastTransactions = function(trytes) {
  var command = {
    'command': 'broadcastTransactions',
    'trytes': trytes
  }

  var options = {
    type: "POST",
    url: "http://localhost:14265",
    data: JSON.stringify(command)
  };

  return $.ajax(options);
}

/**
  *   Stores the successfully generated and attached transaction locally
  *   @param {array} trytes (provided by attachToTangle API Call)
**/
var storeTransactions = function(trytes) {
  var command = {
    'command': 'storeTransactions',
    'trytes': trytes
  }

  var options = {
    type: "POST",
    url: "http://localhost:14265",
    data: JSON.stringify(command)
  };

  return $.ajax(options);
}


$.when(

  // Get an address
  getNewAddress(),
  // As well as the latest milestone
  getNodeInfo()
).done(function(newAddress, newMilestone) {

  var address = newAddress[0].address;
  var milestone = newMilestone[0].milestone;
  console.log("Generate your address from your private key. Getting tips and preparing the transfer now (this can take a few minutes).");

  $.when(

    // Tip selection
    getTxToApprove(milestone),
    // Prepare the trytes (transaction data) for our transaction
    prepareTransfers(address)
  ).done(function(txsToApprove, preparedTrytes) {

    var branchTx = txsToApprove[0].branchTransactionToApprove;
    var trunkTx = txsToApprove[0].trunkTransactionToApprove;
    var transferTrytes = preparedTrytes[0].trytes;
    console.log("Successfully generated the trytes for your address transaction. Doing the PoW now (this can take a few minutes).");

    // Attach the transaction to the Tangle
    // Wait for callback and then broadcast and store it
    // This API call can take several minutes
    attachToTangle(branchTx, trunkTx, transferTrytes).done(function(data) {

      if (data.error) return console.log(data.error);
      console.log("Successfully attached your address to the tangle. Broadcasting it now.");

      // Broadcast the transaction to all neighbors
      broadcastTransactions(data.trytes).done(function(success) {

        if (success.exception) return console.log(success.exception);
        console.log("Successfully broadcast your transasction. Storing it now.");

        // Store the transaction in the local tangle
        storeTransactions(data.trytes).done(function(finished) {

          if (finished.exception) return console.log(finished.exception);

          console.log("Successfully generated, attached to the Tangle, broadcast and stored your address " + address);
        })
      })
    })
  })
})
