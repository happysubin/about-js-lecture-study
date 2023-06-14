import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: String, required: true, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
