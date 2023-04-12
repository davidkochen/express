const express = require("express");
const ProductManager = require("./ProductManager/ProuductManager.js");

const app = express();
const productManager = new ProductManager(".ProductManager/products.json");

const PORT = 8080; 

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getAllProducts();
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
