const express   = require('express');
const router    = express.Router();
const Image = require('../../models/Image');
const Video = require('../../models/video');

const cloudinary = require('cloudinary');
const multer = require('multer');









router.get('/getImage',function(req,res){
  
 
  Image.find({},function(err,images){
    if (err) {
      console.log(err);
    } else {
      
    // res.render('image',{images:images});  
    res.json(images)      
    console.log(images)
    // res.json(image)

  }
  })
})

router.get('/getVideo',function(req,res){
  
 
  Video.find({},function(err,videos){
    if (err) {
      console.log(err);
    } else {
      
    // res.render('image',{images:images});  
    res.json(videos)      
    console.log(videos)
    // res.json(image)

  }
  })
})


// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

// const fileFilter =  (req,file,cb) => {
//   if(file.mimetype === 'image/jpeg' || file.mimetype === "image/png" || file.mimetype === "video/mp4"){
//     cb(null,true)
//   }else{
//         cb(null,true)

//   }
// }
 
var upload = multer({ storage: storage})

 router.post('/imageUpload', upload.single('file'), function(req,res){
   
 
    cloudinary.uploader.upload_large(req.file.path,
    function(result){
      
     

      const newImage = {
        Image:result.secure_url
      }
      
      
      Image.create(newImage,function(err,image){
        if (err) {
          console.log(err)
        } else {
          console.log(image)
          res.json(image)
        }
      })

     

    })
 })





 router.post('/videoupload', upload.single('video'), function(req,res){
   
 
  cloudinary.v2.uploader.upload(req.file.path,
    { resource_type: "video" },
  function(result){
    

    const newVideo = {
      Video:result.secure_url
    }
    
    Video.create(newVideo,function(err,video){
      if (err) {
        console.log(err)
      } else {
        console.log(video)
        res.json(video)
      }
    })

   

  })
})


 

 module.exports = router
