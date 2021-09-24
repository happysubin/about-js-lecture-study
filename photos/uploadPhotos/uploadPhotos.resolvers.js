import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

const uploadPhotoLogic = async (_, { file, caption }, { loggedInUser }) => {
  let photoUrl = null;
  let hashtagObj = [];
  if (file) {
    const { filename, createReadStream } = await file; //파일 종류 이름 ,createReadStream, encoding 프로퍼티가 있다.
    const readStream = createReadStream();
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`; //업로드에다가 보내버림 process.cwd는 작업하는 우리 디렉토리다.
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    ); //업로드에다가 보내버림 process.cwd는 작업하는 우리 디렉토리다.

    readStream.pipe(writeStream); //연결을 시켜준다
    photoUrl = `http://localhost:4000/static/${newFilename}`; // 이 url에서 static 메소드를 이용해 우리의 정적 파일 콘텐츠 들을 보여준다.
    //그래서 파일이 아닌 파일의 경로를  db에 저장해서 제공한다
    console.log(photoUrl);
  }
  if (caption) {
    const hashtags = caption.match(/#[\w]+/g);
    hashtagObj = hashtags.map((hashtag) => ({
      where: { hashtag },
      create: { hashtag },
    }));
  }

  return client.photo.create({
    data: {
      file: photoUrl,
      caption,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      ...(hashtagObj.length > 0 && {
        //해쉬태그가 있을때만
        hashtags: {
          connectOrCreate: hashtagObj,
          //필드 값이 유니크해야 사용가능. 이름 값 함.
        },
      }),
    },
  });
};

export default {
  Mutation: {
    uploadPhoto: protectedResolvers(uploadPhotoLogic),
  },
};
