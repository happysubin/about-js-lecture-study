import client from "../client/client";
import { createHashPassword } from "../middleware/password";

export default {
  signUp: async (user) => {
    const { password, email, gender, birth } = user;
    const { hashedPassword, salt } = await createHashPassword(password);
    console.log(hashedPassword, salt);
    await client.user.create({
      data: {
        password: hashedPassword,
        email,
        gender,
        birth,
        salt,
      },
    });
  },
};
