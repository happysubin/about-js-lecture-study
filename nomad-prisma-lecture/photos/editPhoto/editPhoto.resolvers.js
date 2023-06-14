import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";
import { processHashtag } from "../photos.utils";

const editPhotoLogic = async (_, { id, caption }, { loggedInUser }) => {
  //사진을 edit 하는 사람은 로그인한 사람이 사진의 주인이여야 한다.
  const oldPhoto = await client.photo.findFirst({
    where: { id, userId: loggedInUser.id },
    include: { hashtags: { select: { hashtag: true } } },
  });
  if (!oldPhoto) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }

  const photo = await client.photo.update({
    where: { id },
    data: {
      caption,
      hashtags: {
        disconnect: oldPhoto.hashtags,
        connectOrCreate: processHashtag(caption),
      },
    },
  });

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    editPhoto: protectedResolvers(editPhotoLogic),
  },
};
