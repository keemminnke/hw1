const express=require("express")
const mongoose =require('../../moongoose/index.js')
const Customer=require("../../moongoose/schemas/customer.js")
const router =express.Router();
mongoose.connect();
router.get("/", async (req, res)=>{
    const customers = await Customer.find();
    console.log(customers);
    res.send(customers);
});
router.post("/", async (req, res)=>{
    console.log('post');
});
router.put("/", async (req, res)=>{
    console.log('put')
}); 
router.delete("/", async (req, res)=>{
    console.log('delete')
});

module.exports= router;