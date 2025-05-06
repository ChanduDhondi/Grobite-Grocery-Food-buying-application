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
    origin: "https://grobite.netlify.app/",
    methods: ["GET", "POST"],
  },
});
socket(io);

//middlewares
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://grobite.netlify.app",
    methods: ["GET", "PUT", "POST"],
  })
);

//db connection
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

//route middleware
app.use("/api", appRoute);

app.all("*", (req, res) => {
  res.status(404).json({ message: "You Lost. No Route Exists" });
});

server.listen(process.env.PORT || 8000, (req, res) => {
  console.log(`App is running on Port: ${process.env.PORT}`);
});
