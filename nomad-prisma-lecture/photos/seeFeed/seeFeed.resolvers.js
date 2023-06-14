import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

const seeFeedLogic = async (_, __, { loggedInUser }) =>
  client.photo.findMany({
    where: {
      OR: [
        { user: { followers: { some: { id: loggedInUser.id } } } }, //팔로워 목록에 내이름이 있는 유저들의 사진을 찾으면 된다.
        { userId: loggedInUser.id }, //내 사진을 본다
      ],
    },
    orderBy: {
      createdAt: "desc",
    }, //정렬
  });

export default {
  Query: {
    seeFeed: protectedResolvers(seeFeedLogic),
  },
};
