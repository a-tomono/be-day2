//libs
const crypto = require("crypto");

// Hashed byte array calculated from stdin
let hashArray = [];
process.stdin.on("data", (input) => {
    hashArray = input.toString().split("\n").map((txid) => {
        return Buffer.from(txid.match(/(.{2})/g).reverse().join(""), "hex");
    })
});

// double-hashed concatinated node1 and node2
const concatDoubleHash = (node1, node2) => {
    hashed = crypto.createHash("sha256").update(Buffer.concat([node1, node2])).digest();
    doubleHashed = crypto.createHash("sha256").update(hashed).digest();
    return doubleHashed;
}

const calcMerkleTree = (hashArray) => {
    if(hashArray.length % 2 == 1){
        // it would have an odd number of elements,
        // the final double-hash is duplicated to ensure that the row has an even number of hashes
        // https://en.bitcoin.it/wiki/Protocol_documentation#Merkle_Trees
        hashArray.push(hashArray[hashArray.length - 1]);
    }

    let merkleTree = [];
    for(var idx=0; idx<hashArray.length; idx+=2){
        merkleTree.push(concatDoubleHash(hashArray[idx], hashArray[idx+1]));
    }

    return merkleTree;
}

// run
// generate merkle tree after stdin finished
process.stdin.on("end", () => {
    while(hashArray.length > 1) {
        hashArray = calcMerkleTree(hashArray);
    }
    
    console.log("hash of merkle root is: " + hashArray[0].toString("hex").match(/(.{2})/g).reverse().join(""));
});
