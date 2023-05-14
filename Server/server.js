const express = require("express");
const cors = require("cors");
const db = require("./database/database.js");
const usserAccountRouter = require("./routes/ussersAccount.js");

const app = express();
app.use(express.json());
app.use(cors());

// ---- UserAccountRouter
app.use("/user", usserAccountRouter);

const PORT = 3000;

db.connect((error) => {
  if (error) console.log(error);
  else console.log("Connected to db");
});

app.get("/", (req, res) => {
  res.send("Salut din main");
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
