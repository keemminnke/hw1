const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const Customer = require("../moongoose/schemas/customer");
const fs = require("fs");

router.get("/", function (req, res,) {
    fs.readFile("./views/join.html", (err, data) => {
        if (err) {
            res.send("error");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        }
    });
});
//중복확인
router.post('/check-duplicate', async (req, res) => {
    try {
        const { ID } = req.body;
        const existingUser = await Customer.findOne({ ID });

        if (existingUser) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '서버 오류 발생' });
    }
});
//회원가입 정보 mogodb에 저장
router.post('/register', async (req, res) => {
  try {
      const { ID, password } = req.body;

      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

      const customer = new Customer({ ID, password: hashedPassword });
      await customer.save();

      return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '서버 오류 발생' });
  }
});


module.exports = router;





      