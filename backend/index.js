const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { dbconnect } = require("./db/connection");
const authRouter = require("./routes/authRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");
const userRouter = require("./routes/usersRoutes");
const http = require("http");
const { Server } = require("socket.io");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://chattyproject.vercel.app",
    methods: ["GET", "POST"],
    allowEIO3: true,
  },
  rejectUnauthorized: false,
});
const PORT = process.env.PORT || 5000;

//deb connection
dbconnect(process.env.MONGO_URL);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//routes

app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/user", userRouter);

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (id) => {
    socket.join(id);
    socket.emit("connected");
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat?.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
