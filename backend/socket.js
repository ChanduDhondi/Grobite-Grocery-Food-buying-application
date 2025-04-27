const Orders = require("./models/orders");

function handleSocket(socket) {
  console.log("User connected:", socket.id);

  socket.on("registerUser", async (userId) => {
    try {
      const orders = await Orders.find({ user: userId });
      socket.emit("showOrders", orders);
    } catch (err) {
      console.log("Error fetching orders:", err.message);
      socket.emit("orderError", { error: "Failed to fetch orders" });
    }
  });

  socket.on("newOrder", async (data) => {
    const { status, items, totalPrice, userId } = data;
    if (!status || !items || !totalPrice || !userId) {
      socket.emit("orderError", {
        error: "Required Fields: status, items, totalPrice, userId",
      });
      return; // Always return after emitting error
    }
    try {
      await Orders.insertOne({
        status,
        items,
        totalPrice,
        user: userId,
      });
      const orders = await Orders.find({ user: userId }).toArray();
      socket.emit("showOrders", orders);
    } catch (err) {
      console.log("Error while creating Order", err.message);
      socket.emit("orderError", { error: "Internal server error" });
    }
  });
}

function socket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    handleSocket(socket);

    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
}

module.exports = socket;
