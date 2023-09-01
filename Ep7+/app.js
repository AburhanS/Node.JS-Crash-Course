const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const dbInfo = require("./dbadmin");

// express app
const app = express();

// Connect to MongoDB & listen for requests
const dbURI = "mongodb+srv://"+ process.env.username +":"+ process.env.password +"@"+ process.env.collection +".gdyxkb7.mongodb.net/"+ process.env.collection +"?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

// Register view engine
app.set("view engine", "ejs");
// app.set("views", "myCustomViewLocation")

// middleware & static files
app.use(express.static("public"));
// app.use(morgan("dev"));
// app.use(morgan("tiny"));
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

/* // mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) =>{
    const blog = new Blog({
        title: "new blog 2",
        snippet: "about my new blog",
        body: "more about my new blog"
    });

    blog.save()
        .then(result =>{
            res.send(result);
        })
        .catch(err => console.log(err));
});

app.get("/all-blogs", (req, res) =>{
    Blog.find()
        .then(result =>{res.send(result)})
        .catch(err => console.log(err));
});

app.get("/single-blog", (req, res) =>{
    Blog.findById("64f00d2e547ebb772910120c")
        .then(result => res.send(result))
        .catch(err => console.log(err));
}); */

/* app.use((req, res, next) => {
    console.log("new request made");
    console.log("host: ", req.hostname);
    console.log("path: ", req.path);
    console.log("method: ", req.method);
    next();
});

app.use((req, res, next) => {
    console.log("in the next middleware");
    next();
}); */

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

/* app.use((req, res, next) => {
    console.log("another middleware");
    next();
}); */

app.get("/about", (req, res) => {
    res.render("about", { title: "About"});
});

// Blog routes
app.use("/blogs", blogRoutes);

// 404 Page
app.use((req, res) => {
    res.status(404).render("404", { title: "404"});
});