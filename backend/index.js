const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { dbconnect } = require("./db/connection");
const authRouter = require("./routes/authRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//deb connection
dbconnect(process.env.MONGO_URL);

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//routes

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
