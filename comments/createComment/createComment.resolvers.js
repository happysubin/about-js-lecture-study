import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

const createCommentLogic = async (
  _,
  { photoId, payload },
  { loggedInUser }
) => {
  const checkPhoto = await client.photo.findUnique({
    where: { id: photoId }, //유니크한 애트리뷰트인 아이디에서 포토 아이디와 맞는거를 가져올거야!
    select: { id: true }, //아이디만 가져올거야!
  });
  if (!checkPhoto) {
    return {
      ok: false,
      error: "Photo not found",
    };
  }
  await client.comment.create({
    data: {
      payload,
      photo: { connect: { id: photoId } },
      user: { connect: { id: loggedInUser.id } },
    },
  });

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    createComment: protectedResolvers(createCommentLogic),
  },
};
