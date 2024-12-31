const mongoose = require('mongoose')
 
//  value send in object type in data base
const CarSchema = new mongoose.Schema({
   
    // heading:{
    //   type:String,
    //   require:true
    // },
    // carOptions: [
    //   {
    //     type: { type: String, required: true },
    //     price: { type: Number, required: true },
    //   },
    // ],
    imageUrl:{
      type:String,
      require:true
  },
  price:{
      type:Number,
      require:true
  },
 
  carOptionsList: [
      {
        type: { type: String, required: true },
        list: { type: String, required: true },
      },
    ],
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    facility: [
      {
       listF : { type: String, required: true },
       listS : { type: String, required: true },
      },
    ],
    whychoose: [
      {
       listf : { type: String, required: true },
       lists : { type: String, required: true },
      },
    ],
    desc:{
     type:String,
     require:true,
    }
,
  carname:{
      type:String,
      require:true
  },
  carheading:{
    type:String,
    require:true
},
seater:{
    type:String,
    require:true
}
  
}) 
const Car = mongoose.model('car', CarSchema);
module.exports = Car


