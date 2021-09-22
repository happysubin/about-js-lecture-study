import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });

      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }

      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0, //첫패이지라면 lastId가 없으므로 0 생략할게 없어!
          ...(lastId && { cursor: { id: lastId } }), //유니크한 프로퍼티를 넣어야한다
        });
      //커서는 디비에게 보내지는 값이다. 자신이 마지막으로 본 결과라고 알려준다.

      return {
        ok: true,
        following,
      };
    },
  },
};
