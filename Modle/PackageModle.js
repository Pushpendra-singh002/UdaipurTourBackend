const mongoose = require("mongoose")

const pbookingSchmea = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
      type:String,
      require:true
    }
    ,phone:{
        type:Number,
        require:true,
    },
    date:{
        type:Date,
        require:true,
  }, 
  tourcode:{
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
  heading:{
    type:String,
    require:true,
  },
  price:{
    type:String,
    require:true
  },
  duration:{
    type:String,
    require:true
  },
  facility:{
    type:String,
    require:true,
  }
})

const Pbooking = mongoose.model('pbook', pbookingSchmea)
module.exports = Pbooking