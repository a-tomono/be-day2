// libs
const crypto = require("crypto");

const blockHeader = process.argv[2]; //fix: to standard i/o

// function generates double-hash string
const bBlockHeader = Buffer.from(blockHeader, "hex");
const doubleHash = (bBlockHeader) => {
    hashed = crypto.createHash("sha256").update(bBlockHeader).digest();
    doubleHashed = crypto.createHash("sha256").update(hashed).digest();
    return doubleHashed;
}

// calcurate nonce
for(var nonce=0; ; nonce++) {
    bBlockHeader.writeUInt32LE(nonce, 76); // blockHeader whole length is 80 Byte, nonce is 4 Byte.
    // override nonce.
	var hashedHeader = doubleHash(bBlockHeader);
	if(hashedHeader[31]==0 && hashedHeader[30]==0) { // hexstring is 0 to F
		console.log(nonce);
		console.log(hashedHeader.toString('hex').match(/(.{2})/g).reverse().join(''));
		return;
	}
}
