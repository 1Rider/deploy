const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const Cart = require("../models/cart.model.js")

const jwtProvider = require("../config/jwtProvider.js");


const createUser = async (userData) => {
	try {
		let { firstName, shopName, mobile, password } = userData;
		const isUserExist = await User.findOne({ mobile });
		if (isUserExist) {
			throw new Error("User already exist with Mobile Number");
		}
		password = await bcrypt.hash(password, 9);
		const user = await User.create({ firstName, shopName, mobile, password });
		if (user) {
			console.log("Created User is :", user);
		} else {
			console.log("User not created ");
		}
		const cart = await Cart.create({ user });
		if (cart) {
			console.log("cart created successfully in createuser", cart)
		} else {
			console.log("cart not created in createuser")

		}
		return user;
	} catch (error) {
		throw new Error(error.message);
	}
}

//const findUserById = async (userId) => {
//	try {
//		const user = await User.findById(userId);
//
//		//const user = await User.findById(userId).populate("address");
//
//		if (!user) {
//			throw new Error("user not found with Id", userId);
//
//
//		}
//		return user;
//	} catch (error) {
//		console.log("main error in finduserbyid");
//		throw new Error(error.message);
//	}
//}


const findUserById = async (userId) => {
	try {
		const user = await User.findById(userId);

		if (!user) {
			throw new Error(`User not found with ID: ${userId}`);
		}
		return user;

	} catch (error) {
		throw new Error(error.message);
	}
};



const getUserBymobile = async (mobile) => {
	try {
		const user = await User.findOne({ mobile });
		if (!user) {
			throw new Error("user not found with Phone Number", mobile);
		}
		return user;
	} catch (error) {
		throw new Error(error.message);
	}
}

const getUserProfileByToken = async (token) => {
	try {
		const userId = jwtProvider.getUserIdFromToken(token);
		const user = await findUserById(userId);
		if (!user) {
			throw new Error(`User not found with User Id: ${userId}`)
		}
		return user;
	} catch (error) {
		console.error(`Error in getUserProfileByToken: ${error.message}`);  // Log the actual error message
		throw error;  // Re-throw the original error instead of creating a new one
	}
}

const getAllUsers = async () => {
	try {
		const users = await User.find();
		return users;

	} catch (error) {
		throw new Error(error.message);
	}
}


module.exports = {
	createUser,
	findUserById, getUserBymobile,
	getUserProfileByToken,
	getAllUsers,
};