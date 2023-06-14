const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("11-stream/file.txt");
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream("11-stream/file4.txt");

const piping = readStream.pipe(zlibStream).pipe(writeStream); //연결해버린다
piping.on("finish", () => {
  console.log("Done!!!!");
});
