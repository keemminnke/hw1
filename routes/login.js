const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require('crypto');
const Customer = require("../moongoose/schemas/customer");
const fs = require("fs");
const router = express.Router();
router.get("/", function (req, res, ) {
  fs.readFile("./views/login.html", (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});
//로그인 아이디, 비밀번호 확인 확인 성공하면 토큰발급
router.post("/submitLogin", async (req, res) => {
  try {
    const { ID, password } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const existingUser = await Customer.findOne({ ID, password:hashedPassword });

    if (!existingUser) {
      return res.status(401).json({
        code: 401,
        message: "아이디 또는 비밀번호가 틀렸습니다.",
      });
    }
    const token=jwt.sign(
      {
        ID,
        password:hashedPassword,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:"1h",
        issuer:"kimminkke",
      }
    );
      res.json({
      code: 200,
      message: "로그인 성공",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류 발생' });
  }
});

module.exports = router;



