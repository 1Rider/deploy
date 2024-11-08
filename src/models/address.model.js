const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	shopName: {
		type: String,
		required: true,
	},

	StreetAddress: {
		type: String,
		required: true,
	},

	city: {
		type: String,
		required: true,
	},

	state: {
		type: String,
		//required: true,
	},

	zipCode: {
		type: Number,
		//required: true,
	},
	fullAddress: {
		type: String,
	},
	wardNumber:{
		type:String,
	},
	mobile: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "users"
	}

})

const Address = mongoose.model("addresses", AddressSchema);
module.exports = Address;