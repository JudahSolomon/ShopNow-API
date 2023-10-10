const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/products.routes");
const orderRouter = require("./routes/orders.routes");
const cartRouter = require("./routes/cart.routes");
const multer = require("multer");
require("dotenv/config");

app = express();

// downloading the server backup file
app.get("/backup/:filename", (req, res) => {
  const { filename } = req.params;
  res.download(`path/to/backups/${filename}`);
});

app.use(bodyParser.json({ limit: "10mb" }));
app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", orderRouter);
app.use("/", cartRouter);

const PORT = 3000 || 8000;
app.listen(PORT, () => {
  console.log(`Server Running on Port http://localhost:${PORT}`);
});
