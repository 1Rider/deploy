const Cart = require("../models/cart.model")
const Product = require("../models/product.model")

const CartItem = require("../models/cartItem.model")
async function createCart(user) {

	try {


		const cart = new Cart({ user });
		const createdCart = await cart.save();
		return createdCart;

	} catch (error) {
		throw new Error(error.message);
	}

}
//
//async function findUserCart(userId) {
//	try {
//		let cart = await Cart.findOne({ user: userId });
//		//let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
//		let cartItems = await CartItem.find({ cart: cart._id });
//		cart.cartItems = cartItems;
//		let totalPrice = 0;
//		let totalDiscountedPrice = 0;
//		let totalItem = 0;
//
//		for (let cartItem of cart.cartItems) {
//			totalPrice = cartItem.price;
//			totalDiscountedPrice += cartItem.discountedPrice;
//			totalItem += cartItem.quantity;
//		}
//
//		cart.totalPrice = totalPrice;
//		cart.totalItem = totalItem;
//		cart.discounte = totalPrice - totalDiscountedPrice;
//
//		return cart;
//
//
//	} catch (error) {
//		throw new Error(error.message);
//	}
//}

//
//async function findUserCart(userId) {
//	try {
//		// Try to find the cart for the given user
//		let cart = await Cart.findOne({ user: userId });
//
//		// If no cart is found, return or throw an error
//		if (!cart) {
//			throw new Error(`No cart found for user with ID: ${userId}`);
//		}
//
//		// Find cart items associated with the cart
//		let cartItems = await CartItem.find({ cart: cart._id });
//
//		// Attach cart items to the cart object
//		cart.cartItems = cartItems;
//
//		// Calculate total price, discounted price, and total items
//		let totalPrice = 0;
//		let totalDiscountedPrice = 0;
//		let totalItem = 0;
//
//		// Accumulate totals from cart items
//		for (let cartItem of cart.cartItems) {
//			totalPrice += cartItem.price;
//			totalDiscountedPrice += cartItem.discountedPrice;
//			totalItem += cartItem.quantity;
//		}
//
//		// Add calculated totals to the cart object
//		cart.totalPrice = totalPrice;
//		cart.totalItem = totalItem;
//		cart.discount = totalPrice - totalDiscountedPrice;
//
//		// Return the populated cart object
//		return cart;
//
//	} catch (error) {
//		console.error("Error in findUserCart service:", error.message);
//		throw new Error(error.message);
//	}
//}


async function findUserCart(userId) {
	try {
		// Try to find the cart for the given user
		let cart = await Cart.findOne({ user: userId });

		// If no cart is found, create a new one
		if (!cart) {
			console.log(`No cart found for user with ID: ${userId}. Creating a new cart...`);
			cart = new Cart({
				user: userId,
				cartItems: [],  // No items yet, it's an empty cart
				totalPrice: 0,
				totalItem: 0,
				totalDiscountedPrice: 0,
				discounte: 0,
			});
			await cart.save();  // Save the new cart to the database
		}

		// Find cart items associated with the cart (if any exist)
		let cartItems = await CartItem.find({ cart: cart._id });

		// Attach cart items to the cart object
		cart.cartItems = cartItems;

		// Calculate total price, discounted price, and total items from the cart items
		let totalPrice = 0;
		let totalDiscountedPrice = 0;
		let totalItem = 0;

		// Accumulate totals from cart items
		for (let cartItem of cart.cartItems) {
			totalPrice += cartItem.price;
			totalDiscountedPrice += cartItem.discountedPrice;
			totalItem += cartItem.quantity;
		}

		// Add calculated totals to the cart object
		cart.totalPrice = totalPrice;
		cart.totalItem = totalItem;
		cart.totalDiscountedPrice = totalDiscountedPrice;
		cart.discounte = totalPrice - totalDiscountedPrice;

		// Return the populated cart object (either with items or empty)
		return cart;

	} catch (error) {
		console.error("Error in findUserCart service:", error.message);
		throw new Error(error.message);
	}
}







async function addCartItem(userId, req) {

	try {
		const cart = await Cart.findOne({ user: userId });
		console.log("cart in addcartitem is : ", cart);
		const product = await Product.findById(req.productId);
		console.log("product in addcartitem is : ", product);
		const existingCartItem  = await CartItem.findOne({ cart: cart._id, product: product._id, userId })
		console.log("existingCartItem  ............... ", existingCartItem );


		//if (!existingCartItem ) {
			const cartItem = new CartItem({
				product: product._id,
				cart: cart._id,
				quantity: 1,
				userId,
				price: product.price,
				size: req.size,
				discountedPrice: product.discountedPrice
			})
			const createdCartItem = await cartItem.save();
			cart.cartItems.push(createdCartItem);
			await cart.save();
		//} 
		return cart.cartItems;
	} catch (error) { throw new Error(error.message); }
}



//
//async function addCartItem(userId, req) {
//	try {
//		// Find the user's cart
//		let cart = await Cart.findOne({ user: userId }).populate("cartItems");
//
//		// Find the product to be added
//		const product = await Product.findById(req.productId);
//		if (!product) {
//			throw new Error("Product not found");
//		}
//
//		// If no cart exists for the user, create a new cart
//		if (!cart) {
//			cart = new Cart({
//				user: userId,
//				cartItems: [],
//				totalPrice: 0,
//				totalItem: 0,
//				totalDiscountedPrice: 0,
//				discount: 0
//			});
//		}
//
//		// Check if the cart already contains this product with the same size
//		let existingCartItem = await CartItem.findOne({
//			cart: cart._id,
//			product: product._id,
//			size: req.size,
//			userId
//		});
//
//		if (existingCartItem) {
//			// If the item already exists in the cart, increase the quantity
//			existingCartItem.quantity += 1;
//			await existingCartItem.save();
//		} else {
//			// If the item does not exist, create a new cart item
//			const cartItem = new CartItem({
//				product: product._id,
//				cart: cart._id,
//				quantity: 1,
//				userId,
//				price: product.price,
//				size: req.size,
//				discountedPrice: product.discountedPrice
//			});
//			const createdCartItem = await cartItem.save();
//
//			// Add the new cart item to the cart
//			cart.cartItems.push(createdCartItem._id);
//		}
//
//		// Recalculate the cart's total price, total discounted price, and total item count
//		cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//		cart.totalDiscountedPrice = cart.cartItems.reduce((acc, item) => acc + (item.discountedPrice * item.quantity), 0);
//		cart.totalItem = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
//
//		// Save the cart
//		await cart.save();
//
//		// Return the updated cart items
//		return cart.cartItems;
//	} catch (error) {
//		throw new Error(error.message);
//	}
//}
//
//










module.exports = { createCart, findUserCart, addCartItem };