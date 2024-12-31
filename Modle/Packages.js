const mongoose = require('mongoose')

const packagesSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    facility:{
        type:String,
        require:true
    }, 
    tourcode:{
        type:String,
        require:true
    },
    duration:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    }


})
const Packages = mongoose.model('packages', packagesSchema)
module.exports = Packages;

