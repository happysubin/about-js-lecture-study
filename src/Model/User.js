import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  location: String,
});

const User = mongoose.model("User", userSchema);

export default User;
