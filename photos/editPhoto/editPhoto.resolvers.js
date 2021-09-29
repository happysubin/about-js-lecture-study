import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

const editPhotoLogic = async (_, { id, caption }, { loggedInUser }) => {
  //사진을 edit 하는 사람은 로그인한 사람이 사진의 주인이여야 한다.
  const ok = await client.photo.findFirst({
    where: { id, userId: loggedInUser.id },
  });
  if (!ok) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  const photo = await client.photo.update({ where: { id }, data: { caption } });
  console.log(photo);
};

export default {
  Mutation: {
    editPhoto: protectedResolvers(editPhotoLogic),
  },
};
