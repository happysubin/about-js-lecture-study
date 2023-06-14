const fs = require("fs").promises; //기본적으로 프로미스를 가져온다

//read file
fs.readFile("9-file/text-new2.txt") // utf8 추가시 바로 string 형태로 나옴 => fs.readFile("9-file/text-new2.txt", "utf8")
  .then((data) => {
    console.log(data); //hello를 버퍼 형태, 데이터 형태로 출력한다
    console.log(data.toString());
  })
  .catch(console.error);

//write file

fs.writeFile("9-file/text-new2.txt", "Hello Dream coders!!!!!!!!!!!") //return 값이 없어서 then을 사용하지 않는다
  .catch(console.error);
//fs.appendFile() 이건 추가함

//copy

fs.copyFile("9-file/text-new2.txt", "9-file/file.txt").catch(console.error);

//folder
fs.mkdir("sub-folder").catch(console.error);

fs.readdir("./")
  .then((data) => console.log(data))
  .catch(console.error); //dir을 싹다 읽어서 출력함
