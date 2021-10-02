import client from "../../client";

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        where: { photoId: id },
        select: { user: true }, //like안에 user만 가져오겠다는 의미
      });
      //client.user.findMany({ where: { likes: { some: { photoId: id } } } }) 이걸로도 찾기 가능!!! 그냥 유저를 찾아 버린다
      console.log(likes);
      return likes.map((like) => like.user);
    },
  },
};

//include는 relation을 추가 select는 보고 싶은 정보를 말해!
