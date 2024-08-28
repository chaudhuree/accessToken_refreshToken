const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./models/Users");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors(
  {
    origin: ["http://localhost:5173"],
    credentials: true,
  }
));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/accessrefreshtoken")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running");
});

// login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (password === user.password) {
        const accessToken = jwt.sign({ email: user.email }, "jwtSecret", {
          expiresIn: "1m",
        });
        const refreshToken = jwt.sign({ email: user.email }, "refreshSecret", {
          expiresIn: "5m",
        });
        // save refreshToken in db
        user.refreshToken = refreshToken;
        user.refreshTokenExp = Date.now() + 300000;
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 300000,
          sameSite: "strict",
        });

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 60000,
          sameSite: "strict",
        });

        res.json({ login: true, accessToken, refreshToken });
      } else {
        res.json({ login: false, message: "No user found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

// logout route
app.post("/logout", async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ logout: true });
});

// register route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      res.json({ register: false, message: "User already exists" });
    } else {
      const newUser = new User({
        username,
        email,
        password,
      });
      await newUser.save();
      res.json({ register: true });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
);
// middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    if(renewToken(req,res)){
      return next();
    }
  }
  jwt.verify(token, "jwtSecret", (err, user) => {
    if (err) {
      return res.json({ valid: false, message: "Invalid token" });
    }
    req.user = user; //user email
    next();
  });
};
// function to renew token
const renewToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const exist = false;
  if (!refreshToken) {
    return res.json({ valid: false, message: "No refresh token found" });
  }
  jwt.verify(refreshToken, "refreshSecret", (err, user) => {
    if (err) {
      return res.json({ valid: false, message: "Invalid refresh token" });
    }
    const accessToken = jwt.sign({ email: user.email }, "jwtSecret", {
      expiresIn: "1m",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60000,
      sameSite: "strict",
    });
    return exist;
  });
};

// protected route
app.get("/protected",verifyToken, async (req, res) => {
  res.json({ valid: true, message: "You are authorized" });
}
);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
