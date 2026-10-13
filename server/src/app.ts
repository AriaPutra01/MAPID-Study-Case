import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.ts";
import reportsRouter from "./routes/reportRoute.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reports", reportsRouter);

app.use(errorHandler);

export default app;
