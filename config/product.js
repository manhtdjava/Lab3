
const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    ten: {
        type: String,
        require: true
    },
    lop: {
        type: String,
        require: true
    },
    namSinh: {
        type: Number
    }
})

const Productmodel = new mongoose.model('car', Product);
module.exports= Productmodel;