import express from "express";
import DecomojiDB from "./models/DecomojiDB.mjs";

const app = express();

app.get("/search", (req, res) => {
  res.json(DecomojiDB.filter((v) => RegExp(req.query.q).test(v.name)));
});

app.listen(3000, () => {
  console.log("decomoji-api server started");
});

export default app;
