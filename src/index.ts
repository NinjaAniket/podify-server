import express from "express";
import "dotenv/config";
import "express-async-errors";
import "./db";

import authRouter from "./router/auth";
import audioRouter from "./router/audio";
import favoriteRouter from "./router/favorite";
import playlistRouter from "./router/playlist";
import profileRouter from "./router/profile";
import historyRouter from "./router/history";
import "./utils/schedule";
import { errorHandler } from "./middleware/error";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/audio", audioRouter);
app.use("/favorite", favoriteRouter);
app.use("/playlist", playlistRouter);
app.use("/profile", profileRouter);
app.use("/history", historyRouter);
app.use(errorHandler);

const PORT = 8989;
app.listen(PORT, () => {
	console.log("port listening", +PORT);
});
