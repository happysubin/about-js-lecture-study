const path = require("path");
const os = require("os");
const fs = require("fs");
//계획
//1. 사용자가 원하는 폴더의 이름을 받아온다.

const folder = process.argv[2];
const workingDir = path.join(__dirname, "../", folder);
//const workingDir = path.join(os.homedir(), "Pictures", folder);

if (!folder || !fs.existsSync(workingDir)) {
  console.error("Plz enter folder name");
}

//2. 그 폴더안에 video, captured, duplicated 폴더들을 만든다
const videoDir = path.join(workingDir, "video");
const captureDir = path.join(workingDir, "capture");
const duplicatedDir = path.join(workingDir, "duplicated");
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(captureDir) && fs.mkdirSync(captureDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

//3.. 폴더안에 있는 모든 파일을 돌면서 확장자에 맞춰서 파일들을 구분한다
fs.promises.readdir(workingDir).then(processFiles).catch(console.error);

function processFiles(files) {
  files.forEach((file) => {
    if (isVideoFile(file)) {
      move(file, videoDir);
    } else if (isCapturedFile(file)) {
      move(file, captureDir);
    } else if (isDuplicatedFile(files, file)) {
      move(file, duplicatedDir);
    }
  });
}

function isVideoFile(file) {
  const regExp = /(mov|mp4)&/gm;
  const match = file.match(regExp);
  return !!match;
}
function isCapturedFile(file) {
  const regExp = /(png|aee)&/gm;
  const match = file.match(regExp);
  return !!match;
}
function isDuplicatedFile(files, file) {
  if (!file.startsWith("IMG_") || file.startsWith("IMG_E")) {
    return false;
  }
  const edited = `IMG_E${file.split("_")[1]}`;
  const found = files.find((f) => f.includes(edited));
  return !!found;
}

function move(file, targetDir) {
  console.info(`move ${file} to ${path.basename(targetDir)}`);
  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);
  fs.promises.rename(oldPath, newPath).catch(console.error);
}
