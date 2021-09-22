import client from "../../client";
import { protectedResolvers } from "../users.utils";

const followUserLogic = async (_, { username }, { loggedInUser }, info) => {
  const ok = await client.user.findUnique({ where: { username } });
  if (!ok) {
    return {
      ok: false,
      error: "That user does not exist.",
    };
  }

  await client.user.update({
    where: { id: loggedInUser.id }, //우리 유저아이디로 와서 유저 팔로잉을 추가해주기 때문!
    data: {
      following: {
        connect: { username }, //다른 유저와 연결시켜준다! 무조건 unique 필드로만 커넥 가능!!!!
        //ex email, username 등 유니크한 필드만 !
      },
    },
  });

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    followUser: protectedResolvers(followUserLogic),
  },
};
