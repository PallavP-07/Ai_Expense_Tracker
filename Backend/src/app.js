import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import userRoutes from "./routes/userRouter.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(morgan("combined"));
app.use("/api/users", userRoutes);
app.get('/', (req, res) => {
  res.send("server is running fine");
});

export default app;
