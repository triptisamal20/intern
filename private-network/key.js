keythereum = require('keythereum');
//address = '0x9f7baf27a52dfa6f48367cc6e95e6aa935148277';
//datadir = './node1';
//password = 'pwdnode1';
address = process.argv[2];
datadir = process.argv[3];
password = process.argv[4];
console.log(process.argv[2]);
console.log(process.argv[3]);
console.log(process.argv[4]);
let str;
keythereum.importFromFile(address, datadir, function (keyObject) {
  keythereum.recover(password, keyObject, function (privateKey) {
    console.log(privateKey.toString('hex'));
  });
});
