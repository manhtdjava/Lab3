var express = require('express');
var router = express.Router();

// them model
const Distributors = require('../models/distributors');
const Fruits = require('../models/fruits');

// Api theem distributors
router.post('/add-distributor', async(req, res)=>{
  try {
    const data = req.body;// lay du lieu tu body
    const newDistributor = new Distributors({
      name: data.name
    }); // tao doi tuong
    const result = await newDistributor.save(); //them vao data 
    if (result) {
      res.json({
        "status": 200,
        "messenger": "Them thanh cong",
        "data": result
      })
    }else{
      res.json({
        "status": 400,
        "messenger": "Loi, Them khong thanh cong",
        "data": []
      })
    }
  } catch (error) {
      console.log(error);
  }
})


// Api theem fruit
router.post('/add-fruit', async (req, res)=>{
  try {
    const data = req.body;// lay du lieu tu body
    const newFruit = new Fruits({
      name: data.name,
      quality:data.quality,
      price: data.price,
      status: data.status,
      image: data.image,
      description: data.description,
      id_distributor: data.id_distributor,
    }); // tao doi tuong
    const result = await newFruit.save(); //them vao data 
    if (result) {
      res.json({
        "status": 200,
        "messenger": "Them thanh cong",
        "data": result
      })
    }else{
      res.json({
        "status": 400,
        "messenger": "Loi, Them khong thanh cong",
        "data": []
      })
    }
  } catch (error) {
      console.log(error);
  }
})


//get ds

router.get('/get-list-fruit', async (req, res)=>{
  try {
    const data = await Fruits.find().populate('id_distributor');
    res.json({
      "status": 200,
        "messenger": "Danh sach fruite",
        "data": data
    })
  } catch (error) {
      console.log(error);
  }
})


//get id 
router.get('/get-list-fruit-id/:id', async (req, res)=>{
  try {
    const {id} = req.params
    const data = await Fruits.findById(id).populate('id_distributor');
    res.json({
      "status": 200,
        "messenger": "Danh sach fruite",
        "data": data
    })
  } catch (error) {
      console.log(error);
  }
})


//get fruit trong khoang gia
router.get('/get-list-fruit-price', async (req, res)=>{
  try {
    const {price_start, price_end} = req.query
    const query = (price = {gte : price_start, lte: price_end});
    const data = await Fruits.findById(query, 'name quanlity price').populate('id_distributor').sort({quality: -1}).skip(0).limit(2);
    res.json({
      "status": 200,
        "messenger": "Danh sach fruite",
        "data": data
    })
  } catch (error) {
      console.log(error);
  }
})


//*Get danh sách Fruits (danh sách trả về gồm: name, quantity, price, id_ditributor) có chữ cái bắt đầu tên là A hoặc X

router.get('/get-list-fruit-name', async (req, res)=>{
  try {
    const query = {$or: [
      {name: {$regex: 'T'}},
      {nname: {$regex: 'X'}}
    ]}
    const data = await Fruits.find(query, "Name quantity price").populate('id_distributor');
    res.json({
      "status": 200,
        "messenger": "Danh sach fruite",
        "data": data
    })
  } catch (error) {
      console.log(error);
  }
})
//Cap nhat 


router.put('/Update-fruit-by-id/:id',async (req,res)=>{
  try {
    const {id} = req.params;
    const data = req.body;
    const updateFruit = await Fruits.findById(id)
    let result = null;
    if (updateFruit) {
        updateFruit.name = data.name ?? updateFruit.name;
        updateFruit.quality = data.quality ?? updateFruit.quality;
        updateFruit.price = data.price ?? updateFruit.price;
        updateFruit.status = data.status ?? updateFruit.status;
        updateFruit.image = data.image ?? updateFruit.image;
        updateFruit.description = data.description ?? updateFruit.description;
        updateFruit.id_distributor = data.id_distributor ?? updateFruit.id_distributor;
        result = await updateFruit.save();
    }
    if (result) {
      res.json({
        "status": 200,
        "messenger": "Cap nhat thanh cong",
        "data": result
      })
    }else{
      res.json({
        "status": 400,
        "messenger": "Loi, Cap nhat khong thanh cong",
        "data": []
      })
    }
  } catch (error) {
      console.log(error);
  }
 
})
module.exports = router;
