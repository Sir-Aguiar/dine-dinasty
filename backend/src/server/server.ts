import express from "express";
import cors from "cors";
import { routes } from "./routes/router";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routes);

export { httpServer };
