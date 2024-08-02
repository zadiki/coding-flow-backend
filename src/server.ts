import express from "express";

const app = express();

const PORT = undefined;

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(PORT, () => {
  console.log(" app running in port " + PORT);
});
