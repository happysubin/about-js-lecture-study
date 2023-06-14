import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import prisma from "../client/client";
import { checkPassword } from "./password";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const passportConfig = { usernameField: "email", passwordField: "password" };
//usernameField는 passport가 읽을 사용자의 아이디를 확인하는 옵션이고 passwordField는 사용자의 비밀번호를 확인하는 옵션

//여기는 로그인 부분.

passport.use(
  "local",
  new LocalStrategy(passportConfig, async function (email, password, done) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return done(null, false, { reason: "존재하는 유저가 없습니다" });
      }
      const check = await checkPassword(user.salt, password);
      if (user.password != check) {
        return done(null, false, { reason: "비밀번호가 틀립니다" });
      }
      return done(null, user);
    } catch (err) {
      console.log(err);
      done(err);
    }
  })
);

//로그인한 토큰을 확인 즉 API 접근 인증
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //jwt의 위치를 명령. 우리는 req Authorization의 BearToken을 가져온다.
      secretOrKey: process.env.SECRET_KEY,
      //jwt키를 복호화할 키를 입력
    },
    async function (jwtPayload, done) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: jwtPayload.email },
        });
        const resUser = {
          id: user.id,
          email: user.email,
          gender: user.gender,
          birth: user.birth,
        };
        done(null, resUser);
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);
