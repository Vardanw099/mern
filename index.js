const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.js");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}!`));

// app.get("/users/:username/:password", (req, res) => {
//   User.find({
//     username: req.params.username,
//     password: req.params.password,
//   }).then((users) => res.status(200).json(users));
// });

app.get("/users", (req, res) => {
  User.find().then((users) => res.status(200).json(users));
});

app.get("/users/content/:id", (req, res) => {
  User.findById(req.params.id).then((result) => res.status(200).json(result));
});

app.post("/users/login", (req, res) => {
  let info = User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (info === null) {
    return res.status(200).json({ message: "Incorrect login or password" });
  } else if (info !== null) {
    res.status(200).json(info);
  }
});

app.post("/users/registration", async (req, res) => {
  const isUsed = await User.findOne({ username: req.body.username }).then(
    (res) => {
      return res;
    }
  );

  if (isUsed) {
    return res
      .status(200)
      .json({ message: "This username is busy, try another" });
  }
  const user = new User(req.body);
  console.log(req.body);
  user.save().then((result) => {
    res.status(201).json(result);
  });
});

app.patch("/users/edit/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then((result) => {
    res.status(200).json(result);
  });
});
app.patch("/users/delete/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then((result) => {
    res.status(200).json(result);
  });
});

app.patch("/users/add/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then((result) =>
    res.status(200).json(result)
  );
});
