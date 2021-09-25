import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
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
  },
};
