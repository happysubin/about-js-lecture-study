import client from "../../client";

export default {
  query: {
    searchUsers: async (_, { keyword }) =>
      client.user.findMany({
        where: { username: { startsWith: keyword.toLowerCase() } },
      }),
  },
};
