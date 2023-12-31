import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const serverListening = () => {
  console.log(`server listening on PORT http://localhost:${PORT}`);
};

app.listen(PORT, serverListening);
