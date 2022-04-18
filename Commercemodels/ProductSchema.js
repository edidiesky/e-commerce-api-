const mongoose = require('mongoose')


const Productsschema = new mongoose.Schema({
	title:{type:String, required:true, unique:true},
	desc:{type:String, required:true},
	img:{type:String, required:true},
	categories:{type:Array},
	size:{type:String},
	colour:{type:String},
	price:{type:Number},

},
{timestamps:true}
)

module.exports = mongoose("Product", Productsschema)


