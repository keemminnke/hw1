const express = require("express");
const router = express.Router();
const fs = require("fs");
const { verifyToken } = require("./middlewares");



router.get("/", function (req, res,) {
  fs.readFile("./views/index.html", (err, data) => {
      if (err) {
          res.send("error");
      } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
      }
  });
});
//토큰 검증요청
router.get("/verifyToken", verifyToken, (req, res) => {
  console.log(req)
  if (req.decoded) {
    res.json({
      code: 200,
      message: "환영합니다. 고객님",
    });
  } 
});
module.exports = router;



