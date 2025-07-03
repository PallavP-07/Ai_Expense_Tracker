import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB } from "./src/config/DBConnection.js";
dotenv.config();
const PORT = process.env.PORT;
const connDB = process.env.MONGODB_CONNECTION_STRING;


connectDB(connDB).then(() => {
  app.listen(PORT, () => {
    console.log("✅ Server running on port:", PORT);
  });
});
