import dotenv from "dotenv";

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue; // .[key] 가 아니다
  console.log(value);
  if (value == null) {
    throw new Error(`key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresSec: required("JWT_EXPIRES_SEC", 86400),
  },
  bcrypt: {
    saltRounds: required("BCRYPT_SALT_ROUNDS", 12),
  },
  host: {
    port: required("HOST_PORT", 8080),
  },
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    database: required("DB_DATABASE"),
  },
};
