require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const socket = require("./socket.js");

//routes
const appRoute = require("./routes/appRouter");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://grobite.netlify.app",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST"],
  },
});
socket(io);

//middlewares
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "https://grobite.netlify.app",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "PUT", "POST"],
    credentials: true,
  })
);

//db connection
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

//route middleware
app.use("/api", appRoute);

app.all("*", (req, res) => {
  res.status(404).json({ message: "You Lost. No Route Exists" });
});

server.listen(process.env.PORT || 8080, (req, res) => {
  console.log(`App is running on Port: ${process.env.PORT}`);
});
