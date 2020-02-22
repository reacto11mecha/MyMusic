if (process.env.NODE_ENV !== "production") require("dotenv").config();
const middle = require("./backend/middlewares");
const serveIndex = require("serve-index");
const express = require("express");
const port = process.env.PORT || 3000;
const music_dir = process.env.MUSIC_DIR || "music";
const app = express();

app.use(middle.httpLogger);

app.use("/music", express.static(music_dir));
app.use("/music", serveIndex(music_dir));

app.get("/api", (req, res) => res.json(middle.file));

app.get("/", (req, res) => res.sendFile("./frontend/index.html"));

app.listen(port, () => console.log(`Listening on port ${port}`));
