import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));

let blogData = [];

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/blogs", (req, res) => {
  res.render("blog", { posts: blogData });
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/submit-form", (req, res) => {
  const { title, content } = req.body;
  blogData = []; // Clear previous blogs
  blogData.push({ id: Date.now(), title, content, createdate: new Date() });
  res.redirect("/blogs");
});

/*EDIT ROUTE */

app.get("/blogs/:id/edit",(req,res)=>{
  const post = blogData.find(p => p.id === parseInt(req.params.id));
  res.render("edit-form",{post})
})

app.post("/blogs/:id/update",(req,res)=>{
const {title,content} =req.body;
const index = blogData.findIndex(p=> p.id === parseInt(req.params.id));
blogData[index]={...blogData[index],title,content};
res.redirect("/blogS");
});

app.post("/blogs/:id/delete",(req,res)=>{
  blogData = blogData.filter(p => p.id !== parseInt(req.params.id));
  res.redirect("/form");
})



app.get('/blogs/:id', (req, res) => {
  const post = blogData.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).send('Blog post not found');
  }
  res.render('single-blog', { post });
});



app.get('/blogs/:id', (req, res) => {
  // Fetch the blog post by id and render the page
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});















