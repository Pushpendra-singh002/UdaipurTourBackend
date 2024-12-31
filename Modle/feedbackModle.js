const mongoose = require('mongoose')

// add review hidden in boolean type and aad review 


const FeedSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },

    title:{
        type:String,
        require:true,
    },
    rating:{
        type:Number,
        require:true,
        },
        comment:{
            type:String,
            require:true
        },
        hidden: { type: Boolean, default: false },

})

const Feed = mongoose.model('feed', FeedSchema)
module.exports = Feed;