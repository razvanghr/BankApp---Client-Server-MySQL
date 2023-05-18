const express = require("express");
const cors = require("cors");
const db = require("./database/database.js");
const usserAccountRouter = require("./routes/ussersAccount.js");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "cookie-secret",
    resave: false,
    saveUnitialized: false,
  })
);

// ---- UserAccountRouter
app.use("/user", usserAccountRouter);

const PORT = 3000;

db.connect((error) => {
  if (error) console.log(error);
  else console.log("Connected to db");
});

app.get("/", (req, res) => {
  req.session.isAuth = true;
  res.send("Salut din main");
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
