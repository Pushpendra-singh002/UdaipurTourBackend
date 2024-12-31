const Book = require('../Modle/BookingModle');
const Car = require('../Modle/CarModle');
const Feed = require('../Modle/feedbackModle');
const Pbooking = require('../Modle/packageModle');
const Packages = require('../Modle/Packages');
const User = require('../Modle/UserModle')

// module.exports.postcar = async (req, res) => {
//   try {
//     const { heading, carOptions } = req.body;

//     // Validation
//     if (!heading || !Array.isArray(carOptions) || carOptions.length === 0) {
//       return res.status(400).json({ message: 'Heading aur carOptions valid hone chahiye.' });
//     }

//     // Naya record banao
//     const newCarRental = new Car({ heading, carOptions });

//     // Database mein save karo
//     const savedData = await newCarRental.save();
//     res.status(201).json({ message: 'Car rental add ho gaya', data: savedData });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Kuch galat ho gaya', error });
//   }
// };

// module.exports.postcar = async(req, res)=>{
//   console.log(req.file , req.body,16)
//   let parsedCarOptionsList = [];
//  try{
//   const imageUrl = req.file.path;
//   const {price, facility,carname, carheading,  carOptionsList }= req.body
//   const parsedCarOptionsList = JSON.parse(carOptionsList);
//   // let parsedCarOptionsList = [];
//   if(!imageUrl || !price || !facility || !carname || !carheading || !Array.isArray(parsedCarOptionsList) || parsedCarOptionsList.length === 0){
//     return res.send({code:400, message:"not find imageurl  , carOptions valid hone chahiye"})
//   }
//   // Validation

//   const data = new Car({imageUrl:imageUrl, price:price, carname:carname, carheading:carheading, facility:facility, carOptionsList:carOptionsList})
//   const newdata = await data.save()
//   if(newdata){
//     return res.send({code:200 , message:"data add successfull "})
//   }else{
//     return res.send({code:400, message:"not add data"})
//   }
//  }catch{
//     return res.send({code: 404, message:"internal err in data"})
//  }
// }

module.exports.postcar = async (req, res) => {
  console.log(req.file, req.body);

  try {
    const imageUrl = req.file?.path; // Use optional chaining to avoid crashing
    const { price, facility, carname, carheading, carOptionsList , faq, whychoose,desc, seater} = req.body;

    // Parse `carOptionsList` if sent as JSON string
    let parsedCarOptionsList = [];
    let parsedfaq = [];
    let parsedfacility = [];
    let parsedchoose = [];
    try {
      parsedCarOptionsList = JSON.parse(carOptionsList);
      parsedfaq = JSON.parse(faq);
      parsedfacility = JSON.parse(facility);
      parsedchoose = JSON.parse(whychoose);
    } catch (err) {
      return res.status(400).send({ code: 400, message: "Invalid carOptionsList format" });
    }

    if (
      !imageUrl ||
      !price ||
      !Array.isArray(parsedfacility) ||
      parsedfacility.length === 0 ||
      !carname ||
      !carheading ||
      !desc ||
      !seater ||
      !Array.isArray(parsedCarOptionsList) ||
      parsedCarOptionsList.length === 0
      || !Array.isArray(parsedfaq) ||
      parsedfaq.length === 0 ||
      !Array.isArray(parsedchoose) ||
      parsedchoose.length === 0 
    ) {
      return res.send({
        code: 400,
        message: "not find imageurl, carOptions valid hone chahiye",
      });
    }

    const data = new Car({
      imageUrl,
      price,
      desc,
      seater,
      carname,
      carheading,
      facility:parsedfacility,
      carOptionsList: parsedCarOptionsList,
      faq: parsedfaq,
      whychoose:parsedchoose
    });

    const newdata = await data.save();
    if (newdata) {
      return res.send({ code: 200, message: "Data added successfully" });
    } else {
      return res.send({ code: 400, message: "Data not added" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.send({ code: 404, message: "Internal error in data processing" });
  }
};


module.exports.getcar = async(req, res)=>{
    const data = await Car.find({})
    if(data){
        return res.send({code:200, message:"Success",data:data})
    }else{
        return res.send({code:400, message:"Car rental is not get "})
    }
}
module.exports.getcarid = async(req, res)=>{
    const {id} =req.params; 
    const data = await Car.findById(id)
    if(data){
        return res.send({code:200, message:"success", data:data})
    }else{
        return res.send({code:400, message:"Car rental is not get "})
    }
}
// module.exports.putcar = async(req, res)=>{
    
//     const { id } = req.params;
//   const {heading,  carOptions}= req.body
//   try{
//     if (!heading || !Array.isArray(carOptions) || carOptions.length === 0) {
//       return res.status(400).json({ message: 'Heading aur carOptions valid hone chahiye.' });
//     }

//      const data = await Car.findByIdAndUpdate(id, {heading, carOptions}, {new:true}) 
//      if(!data){
    
//       return res.send({code:404, message:"not edit"})
//      }else{
//       return res.send(data)
//      }
//   }catch(err){
//     return res.send({code:404, message:"internal err in login "})
//   }
// }

// module.exports.putcar = async(req, res)=>{
//   const {id} =req.params
//     const {price, facility,carname, carheading,carOptionsList } =req.body
//     let imageUrl = req.file ? req.file.path : null;
//     if(req.file){
//       imageUrl = req.file.path
//     }
//     if (
//       !imageUrl ||
//       !price ||
//       !facility ||
//       !carname ||
//       !carheading ||
//       !Array.isArray(parsedCarOptionsList) ||
//       parsedCarOptionsList.length === 0
//     ) {
//       return res.send({
//         code: 400,
//         message: "not find imageurl, carOptions valid hone chahiye",
//       });
//     }
//     try{
//       const data = await Car.findByIdAndUpdate(id, {price, facility,carname, carheading,imageUrl , carOptionsList: parsedCarOptionsList,}, {new: true})
//       if(data){
//         return res.send({code:200 , message:"data add successfull "})
//       }else{
//         return res.send({code:400, message:"not add data"})
//       }
//     }catch{
//       return res.send({code:400, message:"internal err in data"})
//     }

// module.exports.putcar = async (req, res) => {
//   const { id } = req.params; // Extract car ID from the request parameters
//   const { price, facility, carname, carheading, carOptionsList,faq,whychoose,desc} = req.body; // Extract data from request body
//   let imageUrl = req.file ? req.file.path : null; // Set image URL if the file is provided

//   // Ensure carOptionsList is parsed correctly if sent as a string
//   let parsedCarOptionsList;
//   let parsedfaq;
//   let parsedfacility;
//   let parsedchoose;
//   try {
//     parsedCarOptionsList = typeof carOptionsList === "string" ? JSON.parse(carOptionsList) : carOptionsList;
//     parsedfaq = typeof faq === "string" ? JSON.parse(faq) : faq;
//     parsedfacility = typeof facility === "string" ? JSON.parse(facility) : facility;
//     parsedchoose = typeof whychoose === "string" ? JSON.parse(whychoose) : whychoose;
//   } catch (error) {
//     return res.status(400).send({
//       code: 400,
//       message: "Invalid carOptionsList format. Must be a valid JSON array.",
//     });
//   }

//   // Validate required fields
  
//   if (
//     !imageUrl ||
//     !price ||
  
//     !carname ||
//     !carheading ||
//     !Array.isArray(parsedCarOptionsList) ||
//     parsedCarOptionsList.length === 0
//     ||!Array.isArray(parsedfaq) ||
//     parsedfaq.length === 0
//     ||!Array.isArray(parsedfacility) ||
//     parsedfacility.length === 0
//     ||!Array.isArray(parsedchoose) ||
//     parsedchoose.length === 0 ||
//     !desc
//   ) {
//     return res.status(400).send({
//       code: 400,
//       message: "All required fields must be provided, including a valid image URL and car options.",
//     });
//   }

//   try {
//     // Update car details in the database
//     const data = await Car.findByIdAndUpdate(
//       id,
//       {
//         price,
    
//         carname,
//         carheading,
//         imageUrl,
//         desc,
//         facility:parsedfacility,
//       carOptionsList: parsedCarOptionsList,
//       faq: parsedfaq,
//       whychoose:parsedchoose
//       },
//       { new: true } // Return the updated document
//     );

//     // Check if data was updated successfully
//     if (data) {
//       return res.status(200).send({ code: 200, message: "Data updated successfully.", data });
//     } else {
//       return res.status(404).send({ code: 404, message: "Car not found." });
//     }
//   } catch (error) {
//     // Handle errors
//     console.error("Error updating car:", error);
//     return res.status(500).send({ code: 500, message: "Internal server error." });
//   }
// };

module.exports.putcar = async (req, res) => {
  const { id } = req.params; // Extract car ID from the request parameters
  const { price, facility, carname, carheading, carOptionsList, faq, whychoose, desc,seater } = req.body; // Extract data from request body
  const imageUrl = req.file ? req.file.path : null; // Set image URL if the file is provided

  // Parse fields that may be sent as JSON strings
  const parseField = (field) => {
    try {
      return typeof field === "string" ? JSON.parse(field) : field;
    } catch (error) {
      return null;
    }
  };

  const parsedCarOptionsList = parseField(carOptionsList);
  const parsedFaq = parseField(faq);
  const parsedFacility = parseField(facility);
  const parsedChoose = parseField(whychoose);

  // Validate the parsed fields
  if (
    !imageUrl ||
    !price ||
    !carname ||
    !carheading ||
    !desc ||
    !seater ||
    !Array.isArray(parsedCarOptionsList) ||
    parsedCarOptionsList.some(item => typeof item !== "object") ||
    !Array.isArray(parsedFaq) ||
    parsedFaq.some(item => typeof item !== "object") ||
    !Array.isArray(parsedFacility) ||
    parsedFacility.some(item => typeof item !== "object") ||
    !Array.isArray(parsedChoose) ||
    parsedChoose.some(item => typeof item !== "object")
  ) {
    return res.status(400).send({
      code: 400,
      message: "All required fields must be provided with valid data formats.",
    });
  }

  try {
    // Update car details in the database
    const data = await Car.findByIdAndUpdate(
      id,
      {
        price,
        carname,
        carheading,
        imageUrl,
        desc,
        seater,
        facility: parsedFacility,
        carOptionsList: parsedCarOptionsList,
        faq: parsedFaq,
        whychoose: parsedChoose,
      },
      { new: true } // Return the updated document
    );

    // Check if data was updated successfully
    if (data) {
      return res.status(200).send({
        code: 200,
        message: "Data updated successfully.",
        data,
      });
    } else {
      return res.status(404).send({
        code: 404,
        message: "Car not found.",
      });
    }
  } catch (error) {
    // Handle errors
    console.error("Error updating car:", error);
    return res.status(500).send({
      code: 500,
      message: "Internal server error.",
    });
  }
};


module.exports.deletecar = async(req,res)=>{
    const { id } = req.params; // Extract id from req.params
  try {
    const blog = await Car.findByIdAndDelete(id);
    if (blog) {
      return res.send({ code: 200, message: "Delete successful" });
    } else {
      return res.send({ code: 404, message: "Car rental not found" });
    }
  } catch (err) {
    return res.send({ code: 500, message: "Internal server error" });
  }
  
  }
//=============================//=======packages========//========================================
//================================================================================================
  module.exports.packages = async(req,res)=>{
    console.log(req.file , req.body,16)
    try{
    const  imageUrl = req.file.path;
    const  price = req.body.price
    const facility = req.body.facility
    const tourcode = req.body.tourcode
    const duration = req.body.duration
    const name = req.body.name
   
      if(!imageUrl ||!price ||!facility ||!tourcode ||!duration ||!name){
       return res.send({code:400 , message:"Bad request " , })
      }
      const packages = new Packages({imageUrl:imageUrl,price:price, facility:facility,tourcode:tourcode,name:name,duration:duration })
      const newpackage = await packages.save()
      if(newpackage){
        return res.send({code:200, message:"packages add success full"})
      }else{
        return res.send({code:404, message:"packages not add success full"})
      }
    }catch{
     return res.send({code:500, message:"internal err in packages"})
    }
  }
  module.exports.getpackages = async(req, res)=>{
    const data = await Packages.find({})
    if(data){
      return res.send({code:200, message:"get success full",data:data})
    }else{
      return res.send({code:400,message:"data not find"})
    }
  }
  module.exports.getpackagesbyid = async(req, res)=>{
    const {id} = req.params;
    const data = await Packages.findById(id)
    if(data){
      return res.send({code:200, message:"packages find",data:data})
    }else{
      return res.send({code:404, message:"packages" })
    }
  }

  module.exports.postpackages = async(req, res)=>{
    const {id} =req.params
    const {facility, price, duration, name, tourcode} =req.body
    let imageUrl = req.file ? req.file.path : null;
    if(req.file){
      imageUrl = req.file.path
    }
    try{
    const data = await Packages.findByIdAndUpdate(id, {facility, price, duration, name, imageUrl, tourcode}, {new:true})
    if(data){
      return res.send({code:200, message :"packages edit success full"})
    }else{
      return res.send({code:400, message:'packages not edit '})
    }}catch{
      return res.send({code:500, message:"internal err in packages edit"})
    }

  } 
module.exports.deletepackage = async(req, res)=>{
  const {id}=req.params;
  try {
    const blog = await Packages.findByIdAndDelete(id);
    if (blog) {
      return res.send({ code: 200, message: "Delete successful" });
    } else {
      return res.send({ code: 404, message: "Car rental not found" });
    }
  } catch (err) {
    return res.send({ code: 500, message: "Internal server error" });
  }
}

 module.exports.getSummery = async(req, res)=>{
  try{
    const totaluser = await User.countDocuments();
    const totalCar = await Car.countDocuments();
    const totalBlog =await Packages.countDocuments();
    const totalorder = await Book.countDocuments();
    const totalPackage = await Pbooking.countDocuments();
    const totalFeed = await Feed.countDocuments();
    return res.status(200).json({
      success: true,
      totaluser,
      totalCar,
      totalBlog,
      totalorder,
      totalPackage,
      totalFeed,
    })
  }catch(err){
    return res.status(500).json({success: false, err:"dashboard summery err"})
  }
 }
// ============================== car booking ==================================================

module.exports.postbook = async(req, res)=>{
  const {carname, price, email, username, phone, adults, children, date} = req.body
  try{
    const book = new Book({carname, price, email, username, phone, adults, children, date})
    const booking = await book.save();

    if(booking){
      return res.send({code:200, message:"booking success full" })
    }else{
      return res.send({code:400, message:"booking not add"})
    }
  }catch{
    return res.send({code:500, message:"internal err in booking"})
  }
}

module.exports.getbook = async(req, res)=>{
const data = await Book.find({})
if(data){
  return res.send({data:data})
}else{
  return res.send({code:404, message:"booking not get"})
}
}

module.exports.deletebooking = async(req, res)=>{
  const {id} = req.params
  try{
  const data = await Book.findByIdAndDelete(id)
  if(data){
    return res.send({code:200, message:"successful delete booking  "})
  }else{
    return res.send({code:400, message:"internal err in delete booking "})
  }
}catch{
  return res.send({code:500, message:"internal err in delete booking "})
}
}

module.exports.getbookid = async(req, res)=>{
  const {id}=req.params;
 
    const data = await Book.findById(id)
    if(data){
      return res.send({code:200, message:"get successfull",data:data})
    }else{
      return res.send({code:200, message:" not get booking"})
    }
 }

module.exports.putbooking =  async(req, res)=>{
  const {id} = req.params;
  const {carname, price,  username, email, phone, date,adults, children } = req.body;
  try{
    const data = await Book.findByIdAndUpdate(id, {carname, price, email, username, adults, children, date, phone},{new:true})
    if(data){
      return res.send({code:200, message:"booking updated successfull",data:data})
    }else{
      return res.send({code:400, message:"not update"})
    }
  }catch{
    return res.send({code:404, message:"internal err in booking update"})
  }
}

//====================================== ============================== ========================== ========================= =========================
  module.exports.udaipur = async(req, res)=>{
    const {heading, price, tourcode, email, username, phone, adults, children, date, duration, facility } = req.body
    try{
      const book = new Pbooking({heading, price, tourcode, email, username, phone, adults, children, date , duration, facility})
      const booking = await book.save();
  
      if(booking){
        return res.send({code:200, message:"booking success full" })
      }else{
        return res.send({code:400, message:"booking not add"})
      }
    }catch{
      return res.send({code:500, message:"internal err in booking"})
    }
  }

  module.exports.getudaipur = async(req, res)=>{
   const data = await Pbooking.find({})
   if(data){
    return res.send({code:200, data:data})
   }else{
    return res.send({code:400, message:"booking not found"})
   }
  }

  module.exports.deleteudaipur = async(req, res)=>{
    const {id} = req.params
    try{
      const data = await Pbooking.findByIdAndDelete(id)
      if(data){
        return res.send({code:200, message:"successful delete booking"})
      }else{
        return res.send({code:400, message:"not delete package"})
      }
    }catch{
      return res.send({code:500, message:"internal err in booking"})
    }
  }

  module.exports.putpack = async(req, res)=>{
    const { id } = req.params
    const {heading, price, tourcode, email, username, phone, adults, children, date, duration, facility } = req.body
    try{
      const data = await Pbooking.findByIdAndUpdate(id , {heading, price, tourcode, email, username, phone, adults, children, date, duration, facility } ,{new : true})
      if(data){
        return res.send({code:200 , message:"booking success full " , data: data})
      }else{
        return res.send({code:404, message:"not updated data"})
      }
    }catch{
      return res.send({code:500, message:"internal err in pack booking"})
    }
  }

  module.exports.getpackid = async(req, res)=>{
    const { id } = req.params;
  
      const data = await Pbooking.findById(id)
      if(data){
        return res.send({code:200, message :" get id successfull", data:data})
      }else{
       return res.send({code:400, message:"not get data"})
      }
  
  }

  module.exports.customer = async(req, res)=>{
    const {username, rating,title, comment}= req.body;
    try{
      const data = new Feed({username, rating,title, comment})
      const Newdata = await data.save()
      if(Newdata){
        return res.send({code: 200 , message:"post successfull"})
      }else{
        return res.send({code:400, message:"not post data"})
      }

    }catch{
      return res.send({code:500, message:"internal err in post "})
    }
  }

  module.exports.getfeed = async(req, res)=>{
    const data = await Feed.find({})
    if(data){
      return res.send({code:200, message:"feedback get", data:data})
    }else{
      return res.send({code:400, message:"err in feedback"})
    }
  }

  module.exports.deletefeed = async(req, res)=>{
   const {id} = req.params;
    const data = await Feed.findByIdAndDelete(id)
    if(data){
      return res.send({code:200 , message:"delete successfull"})
    }else{
      return res.send({code:404, message:'not delete data'})
    }
  }
  module.exports.getfeedid = async(req, res)=>{
    const {id}= req.params;
    const data = await Feed.findById(id)
    if(data){
      return res.send({code:200 , message:"get feed back", data:data})
    }else{
      return res.send({code:400, message:"not get feed back"})
    }
  }

  module.exports.putfeed = async(req, res)=>{
    const {id}= req.params;
    const {username, rating,title, comment}= req.body
    try{
      const data =await Feed.findByIdAndUpdate(id, {username, rating,title, comment}, {new:true})
      if(data){
        return res.send({code:200, message:"update success full", data:data})
      }else{
        return res.send({code:400, message:"not update successfull"})
      }
    }catch{
      return res.send({code:400, message:"not update internal err"})
    }
  }