import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("server is listening at port : ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection failed! : ", err);
  });
