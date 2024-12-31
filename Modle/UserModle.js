const mongoose =  require('mongoose')
 
const UserSchema = new mongoose.Schema({
username:{
    type:String,
    reuqire:true
},
email:{
    type:String,
    require:true,
},
password:{
    type:String,
    require:true,
},
role: { type: String, default: "visitor" },
phone:{
    type:Number,
    require:true
}

})
const User = mongoose.model("user", UserSchema)
module.exports = User