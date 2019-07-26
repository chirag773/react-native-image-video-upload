const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const cloudinary        = require('cloudinary');
const multer            = require('multer'); 
const Image             = require("./routes/api/Image");


 cloudinary.config({ 
 cloud_name: 'private1', 
 api_key: '745187248568767', 
 api_secret: 'PqKDbZ_YzGi-SsWC5zRkLwHdmIc' 
 }); 





mongoose.Promise = global.Promise;
const url =  "mongodb://localhost/imageupload"


mongoose.connect(url);
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.set('view engine','ejs');

 

app.use("/api/Image", Image);


app.listen(3000, function () {
  console.log('Server started');
});

