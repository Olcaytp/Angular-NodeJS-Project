const path = require("path");
const express = require('express');/*Require is the nodejs import syntax and this simply imports this package and stores its content */
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
//mongo password = sWPjddX2sC4UC7ny

// app.use((req, res, next) => {
  //   console.log('First middleware');
  //   next();
  // });
  
  // app.use((req, res, next) => {
    //   res.send('Hello from express!');
// });
//After lesson 38.


// app.use((req, res, next) => {
  //   res.setHeader(
    //     'Access-Control-Allow-Origin', '*'
//   );
//   res.setHeader(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept'
  //   );
//   res.setHeader(
  //     'Access-Control-Allow-Methods',
  //     'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  //   );
//   next();
// });

// app.post("/api/posts", (req, res, next) => {
  //   const post = req.body;
  //   console.log(post);
//   res.status(201).json({
//     message: 'Post added successfully'
//   });
// });


// app.use("/api/posts", (req, res, next) => {
  //   const posts = [
    //     {
      //       id: "fadf12421l",
      //       title: "First server-side post",
//       content: "This is coming from the server"
//     },
//     {
  //       id: "ksajflaj132",
  //       title: "Second server-side post",
  //       content: "This is coming from the server!"
//     }
//   ];
//   res.status(200).json({
  //     message: 'Posts fetched succesfully!',
  //     posts: posts
  //   });
  // });
  
// module.exports = app;

//After MongoDB installed and models created, we can now connect to the database.

const Post = require('./models/post');
const mongoose = require("mongoose");
//Connecting our Node Express App to MongoDB- Lesson 53
mongoose
  .connect(
    "mongodb+srv://Olcaytp:sWPjddX2sC4UC7ny@cluster0.udz79c9.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use("/api/posts", postsRoutes);


module.exports = app;
