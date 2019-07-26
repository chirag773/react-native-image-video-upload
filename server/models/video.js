var  mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({

Video:{
	type:String
}

});





module.exports = mongoose.model("Video",VideoSchema);