import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  name: { type: String, required: true },
  location: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], //개인이 올린 비디오를 저장하는 배열
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});
//이 상태면 그냥 save 때마다 해싱을 해서 비밀번호 해싱한게 해싱이 되어버림 . 오류 발생
const User = mongoose.model("User", userSchema);

export default User;
