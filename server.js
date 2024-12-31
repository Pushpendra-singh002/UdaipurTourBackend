const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const User = require('./Modle/UserModle')
const app = express()
const jwt = require("jsonwebtoken")
const CarController = require('./Controller/CarController')
const Feed = require('./Modle/feedbackModle')

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// ========================MULTER AND UPLOAD FOLDER ====================================================

const multer = require("multer")
const upload = multer({ dest: 'uploads/' })
app.use('/uploads', express.static('uploads'))

//=======================CORS LIBEREY  ================================================================
const cors = require('cors')
app.use(cors({
    origin: ["http://localhost:3000"],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
  }));
app.use(express.json());    
app.use(cookieParser())
app.use(bodyParser.json());
// ========================MONGOODB CONNECTION =========================================================================
//
// mongoose.connect('mongodb://127.0.0.1:27017/udaipur')
 mongoose.connect('mongodb+srv://dbTours:dbUdaipurTours@tour.oobe1.mongodb.net/Tour?retryWrites=true&w=majority ')
.then(()=>{
    console.log("mongoodb connected successfull ")
}).catch(err => {
    console.log(err)
})

//========================================SINGUP ========================================================================
app.post('/signup', (req, res) => {
    const {username, email, phone, password}= req.body
    bcrypt.hash(password, 10 )
    .then(hash =>{
        User.create({username, email,password:hash, phone })
        .then(users => res.json('Success'))
        .catch(err => res.json(err));

    }).catch(err => console.log(err.massage))
})
//======================================LOGIN==============================================================================
app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    User.findOne({email:email})
    .then(user =>{
      if(user){
      bcrypt.compare(password, user.password, (err, result)=>{
       
        if(result){
          const token = jwt.sign({email: user.email, role: user.role},
            "jwt-secret-key", {expiresIn:'1d'})
            res.cookie('token', token)
          return res.json({ Status: "Success", role: user.role, id: user._id ,username: user.username, 
            phone: user.phone,      
            email: user.email 
               });
             
        }else{ res.json('the password is incorrect')
          
        }
      })
       
      }else{
        res.status(500).json("no record existed")
      }
    })
  
   })
//====================================================LOGOUT================================================================
   app.use('/logout', (req, res)=>{
    res.clearCookie('token')
    return res.json({status : true})
   })
// ==================================================VARIFICATION===========================================================
   const varifyUser = (req, res, next )=>{
    const token =req.cookies.token;
    if(!token){
      return res.json("token is miss")
    }else{
      jwt.verify(token, "jwt-secret-key", (err, decoded)=>{
        if(err){
          return res.json("err with token")
        }else{
          if(decoded.role === "admin"){
            next()
          }else{
            return res.json("not admin")
          }
        }
      })
    }
  } 
  app.get('/Dashboard', varifyUser , (req, res)=>{
    res.json("Success")
  })
  app.get('/carrental', varifyUser , (req, res)=>{
    res.json("Success")
  })
  app.get('/packages', varifyUser , (req, res)=>{
    res.json("Success")
  })
  app.get('/order', varifyUser , (req, res)=>{
    res.json("Success")
  })
  app.get('/pack', varifyUser , (req, res)=>{
    res.json("Success")
  })
  app.get('/feed', varifyUser , (req, res)=>{
    res.json("Success")
  })
  // ============================================USER ID GET LOGIN ==========================================================================
  app.get('/api/user/:id', (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
  
    User.findById(id)
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  
 

app.listen(5002, ()=>{
    console.log('Server is running on 5002 ')
})


// =============================================== ALL CONTROLLER URL ============================================================
   //================car controller ===========================
app.post('/api/carrental',upload.single('image'), CarController.postcar)
app.get('/api/carrental', CarController.getcar)
app.get('/api/carrental/:id',upload.single('imageUrl'), CarController.getcarid)
app.put('/api/carrental/:id',upload.single('imageUrl'), CarController.putcar)
app.delete('/api/carrental/:id' , CarController.deletecar)

// =================packages controller ========================

app.post('/api/packages',upload.single('image'), CarController.packages)
app.get('/api/packages',CarController.getpackages)
app.get('/api/packages/:id',upload.single('imageUrl'), CarController.getpackagesbyid)
app.put('/api/packages/:id',upload.single('imageUrl'), CarController.postpackages)
app.delete('/api/packages/:id' , CarController.deletepackage)

// ====================COUNT USER, ORDER AND PACKAGE ====================================================================
app.get('/api/home' , CarController.getSummery) 
//======================= booking =======================================================================================
app.post('/api/users', CarController.postbook)
app.get('/api/booking', CarController.getbook)
app.delete('/api/booking/:id', CarController.deletebooking)
app.get('/api/booking/:id', CarController.getbookid)
app.put('/api/booking/:id' , CarController.putbooking)

//============================== Packages booking =================================
app.post('/api/udaipur' , CarController.udaipur)
app.get('/api/udaipur', CarController.getudaipur)
app.delete('/api/udaipur/:id', CarController.deleteudaipur)
app.get('/api/udaipur/:id', CarController.getpackid )
app.put('/api/udaipur/:id', CarController.putpack)

// =============================== CUSTOMER FEED BACK =====================================
app.post('/api/customer', CarController.customer)
app.get('/api/customer', CarController.getfeed)
app.delete('/api/customer/:id', CarController.deletefeed)
app.get('/api/customer/:id', CarController.getfeedid)
app.put('/api/customer/:id',CarController.putfeed )


app.put('/api/customer/:id/toggleHide', async (req, res) => {
  try {
    const review = await Feed.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Toggle the 'hidden' property
    review.hidden = !review.hidden;
    await review.save();

    res.status(200).json({ message: 'Hidden state updated', data: review });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
