import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

const toggleLikeLogic = async (_, { id }, { loggedInUser }) => {
  const photo = await client.user.findUnique({ where: { id } }); //사진을 찾는다
  if (!photo) {
    return {
      ok: false,
      error: "Photo not found",
    };
  }

  const like = await client.like.findUnique({
    where: { photoId_userId: { photoId: id, userId: loggedInUser.id } }, //compound unique를 이용해 사용가능
  });

  if (!like) {
    await client.like.create({
      data: {
        user: { connect: { id: loggedInUser.id } },
        photo: { connect: { id: photo.id } },
      },
    });
  } else {
    await client.like.delete({
      where: { photoId_userId: { photoId: id, userId: loggedInUser.id } },
    });
  }
  return {
    ok: true,
  };
};

export default {
  Mutation: { toggleLike: protectedResolvers(toggleLikeLogic) },
};
