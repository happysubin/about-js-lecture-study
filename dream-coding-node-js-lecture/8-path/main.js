const path = require("path");

console.log(__dirname);
console.log(__filename);
console.log(path.sep);
console.log(path.delimiter);

//base
console.log(path.basename(__filename));
console.log(path.basename(__filename, ".js"));

//dir
console.log(path.dirname(__filename));

//확장자
console.log(path.extname(__filename));

//parse
const parsed = path.parse(__filename);
console.log(parsed);
console.log(parsed.root);

const str = path.format(parsed);
console.log(str);

//path.isAbsolute로 상대경로인지 절대경로인지 확인 가능
//path.normalize 는 경로 \ / 를 실수했을때 고쳐줌

console.log(path.join(__dirname, "image"));
