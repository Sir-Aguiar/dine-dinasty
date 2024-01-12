import express from "express";
import cors from "cors";
import { routes } from "./routes/router";
import { createServer } from "http";
import { Server } from "ws";
import handleConnection from "./web-socket/handleConnection";

const app = express();
const httpServer = createServer(app);
const WebSocketServer = new Server({ server: httpServer });

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routes);

WebSocketServer.on("connection", handleConnection);

export { httpServer, WebSocketServer };
