// const express = require('express');
// const app = express();
// const port = 3000;
// app.listen(port,()=>{
//     console.log(`Example app listening on port`);
// })

// const uri = 'mongodb+srv://manh:manh@atlascluster.b4mu9hd.mongodb.net/md18309';

// const mongoose = require('mongoose');

// const proModel = require('./product');
// app.get('/',async (req, res)=>{
//     await mongoose.connect(uri);
//     let products =await proModel.find();

//     console.log(products);
//     res.send(products)
// })  



const express = require('express');
const { default: mongoose } = require('mongoose');
// mongoose.set('string', true);
const uri = 'mongodb+srv://manh:manh@atlascluster.b4mu9hd.mongodb.net/md18309';

const connect = async()=>{
    try {
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('ssss');
    } catch (error) {
        console.log('ffff');
    }
}

module.exports = {connect}

