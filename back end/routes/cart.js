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
    req.session.cart.push(product);  // add item to session

    res.redirect("/cart");
});

// View cart
router.get("/", (req, res) => {
    const cart = req.session.cart || []; // this checks if there is a cart in the session, if not it initializes an empty array //
    // Calculate total price
    const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);  // this helps to add sum + price of current item //
    res.render('page/cart', { cart, total }); // this takkes the cart and total to the cart.ejs //
});

// Remove from cart
router.post("/remove/:id", (req, res) => {
    const { id } = req.params; // take id from url
    if (!req.session.cart) req.session.cart = [];
    req.session.cart = req.session.cart.filter(item => String(item.id) !== id);  // it will remove the id when the conditio is false //
    res.redirect("/cart");
});  

export default router;
