import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, unique: true, required: true, trim: true },
  socialLogin: { type: Boolean, required: true, default: false },
  password: { type: String },
  avatarUrl: { type: String },
  email: { type: String, unique: true, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    //그냥 저장하는 경우를 막기위해!
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
