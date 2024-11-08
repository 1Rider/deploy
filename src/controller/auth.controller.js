const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service.js");


const register = async (req, res) => {
	try {
		const user = await userService.createUser(req.body);
		const jwt = jwtProvider.generateToken(user._id);


		//await cartService.createCart(user);

		return res.status(200).send({ jwt, message: "register successfully" });

	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
}


const login = async (req, res) => {
	const { password, mobile} = req.body;

	try {

		const user = await userService.getUserBymobile(mobile);

		if (!user) {
			return res.status(400).send({ message: "user not find with mobile number", mobile })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).send({ message: "Wrong Password" });
		}
		const jwt = jwtProvider.generateToken(user._id);
		return res.status(200).send({ jwt, message: "login success" });



	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
}

module.exports = { register, login };