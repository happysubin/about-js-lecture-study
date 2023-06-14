//export default 로 내보내야해!!!
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return {
          ok: false,
          error: "password is wrong",
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

      return {
        ok: true,
        token,
      };
    },
  },
};
