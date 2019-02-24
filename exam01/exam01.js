//libs
const crypto = require("crypto");

// generate hash string
const tx = process.argv[2]; //fix to standard i/o
const hashed = crypto.createHash("sha256").update(Buffer.from(tx, "hex")).digest();
const doubleHashed = crypto.createHash("sha256").update(hashed).digest("hex");
const littleEndianed = doubleHashed.match(/(.{2})/g).reverse().join("");
    
console.log("\ntxid is:" + littleEndianed);