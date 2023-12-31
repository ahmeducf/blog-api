/**
 * This module will generate a public and private keyPair and save to current directory
 *
 * Make sure don't commit the private key to the repo
 */
const crypto = require('crypto');
const fs = require('fs');

const directoryPathArg = process.argv[2];

function genKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  fs.writeFileSync(`${directoryPathArg}/id_rsa_pub.pem`, keyPair.publicKey);

  fs.writeFileSync(`${directoryPathArg}/id_rsa_priv.pem`, keyPair.privateKey);
}

// Generate the keyPair
genKeyPair();
