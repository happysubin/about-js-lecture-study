import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  created: { type: Date, required: true, default: Date.now, trim: true }, //trim은 문자열 양 끝에 띄어쓰기를 삭제해준다
  description: { type: String, required: true, trim: true },
  hashtags: [{ type: String }],
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
