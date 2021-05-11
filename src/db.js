import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://admin:kAuOOf2e7vCyf9MR@mongodbtutorial.9kx8g.mongodb.net/wetube?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError); //db에러시 출력
db.once("open", handleOpen);
