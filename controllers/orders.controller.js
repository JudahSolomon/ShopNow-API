const orderService = require("../services/orders.services");

// controller function to handle user registration
exports.userOrders = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const userOrders = await orderService
      .getOrderById({ orderId })
      .populate({
        path: "productId",
        select: "-sizes, -description, -category",
      })
      .exec();

    res.status(201).json(userOrders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
