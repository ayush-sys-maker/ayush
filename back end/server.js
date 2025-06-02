import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// View engine setup
app.set('view engine', 'ejs');  // Removed space
app.set('views', path.join(__dirname, 'views'));  // Changed to 'views'

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Route imports (corrected syntax)
import homeroute from "./routes/MEN.js";
import productroute from "./routes/product.js";
import homepage from "./routes/homepage.js"
import WOMEN from "./routes/WOMEN.js"
import SOCKS from "./routes/SOCKS.js"
import KIDS from "./routes/KIDS.js"
import cart from "./routes/cart.js"
import payment from "./routes/payment.js"

app.use("/MEN", homeroute);
app.use("/products", productroute);
app.use("/home",homepage);
app.use("/WOMEN",WOMEN);
app.use("/SOCKS",SOCKS);
app.use("/KIDS",KIDS);
app.use("/cart",cart);
app.use("/payment",payment);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});