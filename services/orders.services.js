// Assuming you have a database connection set up
const Order = require("../models/orders.model");

class OrdersService {
  // Create a new order
  static async createOrder(orderData) {
    try {
      const newOrder = new Order(orderData);
      await newOrder.save();
      return newOrder;
    } catch (error) {
      throw error;
    }
  }

  // Get all orders
  static async getAllOrders(req, res, next) {
    try {
      const orders = await Order.find();

      res.status(200).json(orders);
      return orders;
    } catch (error) {
      throw error;
    }
  }

  // Get a specific order by ID
  static async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId)
        .populate({
          path: "productId",
          select: "-description -category",
        })
        .exec();
      return order;
    } catch (error) {
      throw error;
    }
  }

  // Update order status
  static async updateOrderStatus(orderId, newStatus) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }
      order.status = newStatus;
      await order.save();
      return order;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrdersService;
