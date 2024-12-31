const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,

    },
    date:{
        type:Date,
        require:true,
  }, 
  type:{
    type:String,
    require:true,
     },
  adults:{
    type:Number,
    require:true
  },
  children:{
    type:Number,
    require:true
  },
  carname:{
    type:String,
    require:true,
  },
  price:{
    type:String,
    require:true
  }

})

const Book = mongoose.model('book', BookSchema)
module.exports = Book