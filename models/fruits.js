const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Fruits = new Scheme({
    name:{type: String},
    quality: {type:Number},
    price: {type:Number},
    status: {type:Number},
    image: {type:String},
    description: {type:String},
    id_distributor: {type:Scheme.Types.ObjectId, ref: 'distributor'},
    
});

module.exports = mongoose.model('fruit', Fruits);