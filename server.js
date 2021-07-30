const express = require("express");
const path = require("path");

const port = process.env.PORT || 8080;
const app = express();

// If an incoming request uses a protocol other than HTTPS, redirect that request to the same url but with HTTPS
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    next();
  };
};

// app.use(forceSSL())

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// const root = require('path').join(__dirname, 'build')
// app.use(express.static(root));
// app.get("/*", (req, res) => {
//     res.sendFile('index.html', { root });
// })

app.listen(port);
