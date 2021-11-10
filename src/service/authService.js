import client from "../client/client";

export default {
  signUp: async (user) => {
    const { password, email, gender, birth } = user;
    await client.user.create({
      data: {
        password,
        email,
        gender,
        birth,
      },
    });
  },
};
