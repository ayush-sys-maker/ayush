import express from "express";
import { products } from "../data/product.js";

const router = express.Router();

// Add to cart
router.get("/add/:category/:id", (req, res) => {
    const { category, id } = req.params;
    const items = products[category];
    if (!items) return res.status(404).send("Category not found");
    const product = items.find(item => String(item.id) === id);
    if (!product) return res.status(404).send("Product not found");

    if (!req.session.cart) req.session.cart = [];
    req.session.cart.push(product);

    res.redirect("/cart");
});

// View cart
router.get("/", (req, res) => {
    const cart = req.session.cart || [];
    // Calculate total price
    const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    res.render('page/cart', { cart, total });
});

// Remove from cart
router.post("/remove/:id", (req, res) => {
    const { id } = req.params;
    if (!req.session.cart) req.session.cart = [];
    req.session.cart = req.session.cart.filter(item => String(item.id) !== id);
    res.redirect("/cart");
});

export default router;
