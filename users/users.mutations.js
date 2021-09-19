//export default 로 내보내야해!!!
import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // check if username or email are already on DB.
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser)
          throw new Error("This username/email is already taken");
        console.log(existingUser); //겹치는 사람이 없으면 null이 나온다
        // hash password
        const hashPassword = await bcrypt.hash(password, 10); // 해싱
        // save and return the user
        return client.user.create({
          data: {
            //이렇게 data로 저장하는걸 주의!!!
            username,
            email,
            firstName,
            lastName,
            password: hashPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
