const router = require("express").Router();
const productController = require("../controllers/product.controller");

router.post("/api/v1/add/product", productController.addNewProduct);
router.get("/api/v1/product/:id", productController.getProductById);
router.get("/api/v1/products", productController.getAllProducts);
router.get("/api/v1/search/:key", productController.searchProduct);
// router.delete("/api/v1/delete/product/:id", productController.deleteProduct);

module.exports = router;
