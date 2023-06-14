import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: (
      { id } //root는 request된 사진
    ) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              //우리가 찾은 id 를 가진 해시태그를 찾는다.
              id,
            },
          },
        },
      }),
    likes: ({ id }) => client.like.count({ where: { photoId: id } }), //사진의 아이디와 요청 받은 아이가 같다면 그 사진의 좋아요를 보여줌
  },
  Hashtag: {
    photos: ({ id }, { page }, { loggedInUser }) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos(); //이러면 해당 해시태그에 모든 사진을 불러온다
    },

    totalPhotos: (
      { id } //parent 에서 id를 꺼낸다
    ) => client.photo.count({ where: { hashtags: { some: { id } } } }),
  }, //이 아이디를 가진 해시태그가 해시태그리스트에 포함돼있는 사진들을모두 새도록 할 거얌
};
