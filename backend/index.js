const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { dbconnect } = require("./db/connection");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//deb connection
dbconnect(process.env.MONGO_URL);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
