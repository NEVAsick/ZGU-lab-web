const express = require("express");
const path = require("path");
const { CatsController } = require("./internal/cats");

const app = express();
const host = "localhost";
const port = 8000;

// 1) Клиент из папки public
app.use(express.static(path.join(process.cwd(), "public")));

// API
app.get("/cats", CatsController.getCats);
app.get("/cats/:id", CatsController.getCatById);

// Запуск
app.listen(port, host, () => {
  console.log(`Server started: http://${host}:${port}`);
});
