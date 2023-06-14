import { exists } from "fs";
const fs = require("fs").promises;
const path = require("path");

fs.readdir(`./${process.argv[2]}`)
  .then((dir) => {
    dir.forEach((file) => {
      if (path.extname(file) === ".mp4" || path.extname(file) === ".mov") {
        exists(`./${process.argv[2]}/video`, (exists) => {
          if (exists) {
            fs.rename(
              `./${process.argv[2]}/${file}`,
              `./${process.argv[2]}/video/${file}`,
              (error) => {
                console.log(error);
              }
            );
          } else {
            fs.mkdir(`./${process.argv[2]}/video`);
            fs.rename(
              `./${process.argv[2]}/${file}`,
              `./${process.argv[2]}/video/${file}`,
              (error) => {
                console.log(error);
              }
            );
          }
        });
      }
      if (path.extname(file) === ".png" || path.extname(file) === ".aae") {
        exists(`./${process.argv[2]}/captured`, (exists) => {
          if (exists) {
            fs.rename(
              `./${process.argv[2]}/${file}`,
              `./${process.argv[2]}/captured/${file}`,
              (error) => {
                console.log(error);
              }
            );
          } else {
            fs.mkdir(`./${process.argv[2]}/captured`);
            fs.rename(
              `./${process.argv[2]}/${file}`,
              `./${process.argv[2]}/captured/${file}`,
              (error) => {
                console.log(error);
              }
            );
          }
        });
      } else {
        if (path.extname(file) === ".jpg") {
          const fileObj = path.parse(file);
          if (!fileObj.name.startsWith("IMG_E")) {
            exists(`./${process.argv[2]}/duplicated`, (exists) => {
              if (exists) {
                fs.rename(
                  `./${process.argv[2]}/${file}`,
                  `./${process.argv[2]}/duplicated/${file}`,
                  (error) => {
                    console.log(error);
                  }
                );
              } else {
                fs.mkdir(`./${process.argv[2]}/duplicated`);
                fs.rename(
                  `./${process.argv[2]}/${file}`,
                  `./${process.argv[2]}/duplicated/${file}`,
                  (error) => {
                    console.log(error);
                  }
                );
              }
            });
          }
        }
      }
    });
    //여기서 뒤에 확장자를가지고 나누자 내일.
  })
  .catch((error) => {
    console.log(error);
  });

//시작 시 인자를 받으려면 process.argv로 실행 인자를 받는다
//fs.exits로 파일이 존재하는지 검사가 가능하다.
