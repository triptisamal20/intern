ethTx = require('ethereumjs-tx');
webjs = require('web3');

var account1 = '0x9f7baf27a52dfa6f48367cc6e95e6aa935148277'
var account2 = '0x24b15a53901ef3b040625d0a2bc9392c618cba44'

var privateKey1 = Buffer.from('a87fcd4df500a3131b02ba68a93bc351f8c50e9e9af08bc1c04cc5708f945e69', 'hex');
var privateKey2 = Buffer.from('54e90527cba9ac0a876ecf2c734f27e5b0e63e0d650cb045a5a4b57ad9daca78', 'hex');

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
console.log("1. Prepare and send single transaction from one account");
console.log("2. Prepare and send multiple transactions from one account");
console.log("3. Prepare and send multiple transactions from different accounts");
console.log("Enter your choice 1/2/3");
//Prepare and send multiple transactions, each time nonce incremented by 2
//Sender is the node 1, and receiver is the node 2 created in the private network




standard_input.on('data',function(data){
	if (data === '1\n'){
		console.log("Sending a single transaction from an account (node 1)");
		var web3 = new webjs('http://localhost:8501');
		web3.eth.getTransactionCount(account1, (err, txCount) => {
			// Build the transaction
			txParams = {
				nonce:    web3.utils.toHex(txCount),
				to:       account2,
				value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
				gasLimit: web3.utils.toHex(21000),
				gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
			}
			// Transaction is created
			tx = new ethTx(txParams);

			//Sending transaction from node 1 (Private key)
			privKey = privateKey1;//Buffer.from('a87fcd4df500a3131b02ba68a93bc351f8c50e9e9af08bc1c04cc5708f945e69', 'hex');
			// Transaction is signed
			tx.sign(privKey);
			serializedTx = tx.serialize();
			rawTx = '0x' + serializedTx.toString('hex');
			console.log(rawTx)
			console.log("Transaction nonce = "+txCount);
			web3.eth.sendSignedTransaction(rawTx)
		})


	}else if(data === '2\n'){
		console.log("Sending multiple transactions from single account (node 1)");
		var web3 = new webjs('http://localhost:8501');

		//for(var i=0; i< 2;i++){

		//	(function(i){
				web3.eth.getTransactionCount(account1, (err, txCount) => {
					// Build the transaction
					txParams = {
						nonce:    web3.utils.toHex(txCount),
						to:       account2,
						value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
						gasLimit: web3.utils.toHex(21000),
						gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
					}
					// Transaction is created
					tx = new ethTx(txParams);

					//Sending transaction from node 1 (Private key)
					privKey = privateKey1;//Buffer.from('a87fcd4df500a3131b02ba68a93bc351f8c50e9e9af08bc1c04cc5708f945e69', 'hex');
					// Transaction is signed
					tx.sign(privKey);
					serializedTx = tx.serialize();
					rawTx = '0x' + serializedTx.toString('hex');
					console.log(rawTx)
					console.log("Transaction nonce = "+txCount);
					web3.eth.sendSignedTransaction(rawTx)


					//Building Transaction with gap
					txCount = txCount+2
					txParams = {
						nonce:    web3.utils.toHex(txCount),
						to:       account2,
						value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
						gasLimit: web3.utils.toHex(21000),
						gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
					}
					// Transaction is created
					tx = new ethTx(txParams);

					//Sending transaction from node 1 (Private key)
					privKey = privateKey1;//Buffer.from('a87fcd4df500a3131b02ba68a93bc351f8c50e9e9af08bc1c04cc5708f945e69', 'hex');
					// Transaction is signed
					tx.sign(privKey);
					serializedTx = tx.serialize();
					rawTx = '0x' + serializedTx.toString('hex');
					console.log(rawTx)
					console.log("Transaction nonce = "+txCount);
					web3.eth.sendSignedTransaction(rawTx)



					//Building Transaction with with previously left nonce
					txCount = txCount-1
					txParams = {
						nonce:    web3.utils.toHex(txCount),
						to:       account2,
						value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
						gasLimit: web3.utils.toHex(21000),
						gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
					}
					// Transaction is created
					tx = new ethTx(txParams);

					//Sending transaction from node 1 (Private key)
					privKey = privateKey1;//Buffer.from('a87fcd4df500a3131b02ba68a93bc351f8c50e9e9af08bc1c04cc5708f945e69', 'hex');
					// Transaction is signed
					tx.sign(privKey);
					serializedTx = tx.serialize();
					rawTx = '0x' + serializedTx.toString('hex');
					console.log(rawTx)
					console.log("Transaction nonce = "+txCount);
					web3.eth.sendSignedTransaction(rawTx)


				})
		//	})(i);
	//	}

		

	}else if (data === '3\n')
	{

		//Send multiple transaction from different accounts
		console.log("Sending multiple transactions from different accounts");
		var web31 = new webjs('http://localhost:8501');
		var web32 = new webjs('http://localhost:8502');

		web31.eth.getTransactionCount(account1, (err, txCount) => {
			// Build the transaction
			txParams = {
				nonce:    web31.utils.toHex(txCount),
				to:       account2,
				value:    web31.utils.toHex(web31.utils.toWei('0.1', 'ether')),
				gasLimit: web31.utils.toHex(21000),
				gasPrice: web31.utils.toHex(web31.utils.toWei('10', 'gwei'))
			}
			// Transaction is created
			tx = new ethTx(txParams);

			//Sending transaction from node 1 (Private key)
			privKey = privateKey1;//Buffer.from('a87fcd4df500a3131b02ba68a93bc351f8c50e9e9af08bc1c04cc5708f945e69', 'hex');
			// Transaction is signed
			tx.sign(privKey);
			serializedTx = tx.serialize();
			rawTx = '0x' + serializedTx.toString('hex');
			console.log(rawTx)
			console.log("Transaction nonce = "+txCount);
			web31.eth.sendSignedTransaction(rawTx)
		})

		web32.eth.getTransactionCount(account2, (err, txCount) => {
			// Build the transaction
			txParams = {
				nonce:    web32.utils.toHex(txCount),
				to:       account1,
				value:    web32.utils.toHex(web32.utils.toWei('0.1', 'ether')),
				gasLimit: web32.utils.toHex(21000),
				gasPrice: web32.utils.toHex(web32.utils.toWei('10', 'gwei'))
			}
			// Transaction is created
			tx = new ethTx(txParams);

			//Sending transaction from node 1 (Private key)
			privKey = privateKey2;
			// Transaction is signed
			tx.sign(privKey);
			serializedTx = tx.serialize();
			rawTx = '0x' + serializedTx.toString('hex');
			console.log(rawTx)
			console.log("Transaction nonce = "+txCount);
			web32.eth.sendSignedTransaction(rawTx)
		})


	}else{
		console.log("None of the above choices; process exiting...");
		process.exit();
	}
});
