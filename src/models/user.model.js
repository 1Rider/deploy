const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	shopName: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	email: {
		type: String,

	},
	mobile: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		default: 'User'
	},
	address: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "addresses"
	}],
	paymentInformation: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "payment_information",
	}],
	ratings: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "ratings",
	}],
	reviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "reviews",
	}],
	createdAt: {
		type: Date,
		default: Date.now()
	},

})

const User = mongoose.model("user", userSchema);
module.exports = User;