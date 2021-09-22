import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const followers = await client.user //유저를 찾아 그 유저의 팔로우 리스트를 다 가져옴
        .findUnique({ where: { username } })
        .followers({
          take: 5, //1페이지는 스킵 xX
          skip: (page - 1) * 5, //2페이지는 앞에 5개를 스킵하고 뒤에 5개를 보여줌 ㅇㅋ? 이렇게 스킵하고 5개만 지속적으로 보여주는거다.
        });

      /*
      const bFollowers = await client.user.findMany({
        //많은 유저들을 찾는데 어떤 유저를 팔로잉 하고 있는 많은 유저들을 다가져옴. some 는 필터링 되는 요소에 하나 이상이 부합하는 값을 리턴.
        //즉 조건이 하나라도 맞으면 리턴
        where: { following: { some: { username } } },
      });
      console.log(bFollowers);
      //둘다 잘 작동!
      */
      return {
        ok: true,
        followers,
      };
    },
  },
};
