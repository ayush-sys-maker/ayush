import express from "express";
import { products } from "../data/product.js";

const router = express.Router();

router.get("/:category/:id", (req, res) => {
    const category = req.params.category;
    const id = parseInt(req.params.id);

    if (!products[category]) {
        return res.status(404).send('Category not found');
    }

    const product = products[category].find(p => p.id === id);

    if (!product) return res.status(404).send('Product not found');

    // Pass an array with one product
    res.render('page/paymen', {
       feature: [product]
    });
});

export default router;