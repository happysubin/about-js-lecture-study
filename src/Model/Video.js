import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  created: { type: Date, required: true, default: Date.now, trim: true }, //trim은 문자열 양 끝에 띄어쓰기를 삭제해준다
  description: { type: String, required: true, trim: true },
  videoURL: { type: String, required: true },
  hashtags: [{ type: String }],
  date: { type: Date, default: Date.now },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((element) => (element.startsWith("#") ? element : `#${element}`));
});
//this 바인딩으로 인해 화살표 함수를 쓸 수 없다!(화살표 함수는 상위 객체의 this이기 때문)
//Instance methods 로 static 말고 Indexes, Virtuals 다양한 메소드들이 있다.

const Video = mongoose.model("Video", videoSchema);

export default Video;
