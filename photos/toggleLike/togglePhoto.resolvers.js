import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

const toggleLikeLogic = async (_, { id }, { loggedInUser }) => {
  const ok = client.user.findUnique({ where: { id } });
  if (!ok) {
    return {
      ok: false,
      error: "Photo not found",
    };
  }
};

export default {
  Mutation: { toggleLike: protectedResolvers(toggleLikeLogic) },
};
