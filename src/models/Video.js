import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 60 },
  fileUrl: { type: String, require: true },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now, trim: true },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
/*
videoSchema.pre("save", async function () {
  // middleware ,hook save 되기 전 pre에 실행됨 일단 문자열이 통채로 한 요소에 들어오므로 index [0] 그다음 분리시작
  this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
*/
const Video = mongoose.model("Video", videoSchema);

export default Video;
