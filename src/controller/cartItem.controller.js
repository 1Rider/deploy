const cartService = require("../services/cartItem.service")

const updateCartItem = async (req, res) => {
	const user = req.user;
	try {

		const updateCartItem = await cartService.updateCartItem(user._id, req.params.id, req.body);
		//console.log(`updatedCartItem.......................................................${updateCartItem}`);
		return res.status(200).send(updateCartItem);


	} catch (error) {
		return res.status(500).send({ error: error.message })
	}
}


const removeCartItem = async (req, res) => {
	const user = req.user;
	try {
		console.log("the controller started*******************************************************************************************************************");
		const updateCartItem = await cartService.removeCartItem(user._id, req.params.id)
		return res.status(200).send({ message: "cart item removed" });

	} catch (error) {
		return res.status(500).send({ error: error.message })
	}
}


module.exports = {
	updateCartItem,
	removeCartItem,
}