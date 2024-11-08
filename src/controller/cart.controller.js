const cartService = require("../services/cart.service")

//const findUserCart = async (req, res) => {
//	const user = req.user;
//	console.log(`user id is : ${user._id}`);
//	try {
//		const userId = user._id;
//		const cart = await cartService.findUserCart(userId);
//		return res.status(200).send(cart);
//
//
//	} catch (error) {
//		return res.status(500).send({ error: error.message })
//	}
//}


const findUserCart = async (req, res) => {
	try {
		// Log the entire req.user object
		console.log("User object from req:", req.user);

		if (!req.user) {
			return res.status(400).send({ error: "User not authenticated" });
		}

		const user = req.user;
		console.log(`User ID is: ${user._id}`);

		const userId = user._id;
		const cart = await cartService.findUserCart(userId);

		return res.status(200).send(cart);

	} catch (error) {
		console.error("Error in findUserCart controller:", error.message);
		return res.status(500).send({ error: error.message });
	}
};












const addItemToCart = async (req, res) => {
	const user = req.user;
	try {
		reqbody = req.body;
		console.log("parameters : ", reqbody, user.id);

		const cartItem = await cartService.addCartItem(user._id, reqbody);
		console.log("cartItem in cart controller is  : ", cartItem);
		return res.status(200).send(cartItem);


	} catch (error) {
		return res.status(500).send({ error: error.message })
	}
}


module.exports = {
	findUserCart,
	addItemToCart,
}


