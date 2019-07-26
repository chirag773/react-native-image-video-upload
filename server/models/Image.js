var  mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({

Image  : {
	type:String
}

});





module.exports = mongoose.model("Image",ImageSchema);