const cartService = require("../services/cart.service")
const Address = require("../models/address.model")
const OrderItem = require("../models/orderItem.model")
const Order = require("../models/order.model")

async function createOrder(user, shipAddress) {
	try {
		let address = [];
		console.log("address direct from user : ", user.address)

		console.log("shipaddress in createorder : ", shipAddress);

		console.log("address direct from user : ", user.address.length)
		if (user.address.length > 0) {
			let existAddress = await Address.findOne({ _id: user.address });
			console.log("if exitsaddress in createorder : ", existAddress);

			address = existAddress;
		} else {
			address = new Address(shipAddress);
			address.user = user;
			await address.save();
			user.address.push(address);
			console.log("else address in createorder : ", address);
			await user.save();

		}

		const cart = await cartService.findUserCart(user._id);
		console.log("if cart in createorder : ", cart);

		const orderItems = [];
		for (let item of cart.cartItems) {
			const orderItem = new OrderItem({
				price: item.price,
				product: item.product,
				quantity: item.quantity,
				size: item.size,
				userId: item.userId,
				discountedPrice: item.discountedPrice
			})
			const createdOrderItem = await orderItem.save();
			orderItems.push(createdOrderItem)
		}
		console.log("for orderItems in createorder : ", orderItems);

		const createdOrder = new Order({
			user,
			orderItems,
			totalPrice: cart.totalPrice,
			totalDiscountedPrice: cart.totalDiscountedPrice,
			discounte: cart.discounte,
			totalItem: cart.totalItem,
			shipAddress: address,
		})

		const savedOrder = await createdOrder.save();
		console.log("savedorder in createorder : ", savedOrder);

		return savedOrder;
	} catch (error) {
		throw new Error(error.message);
	}
}


async function placeOrder(orderId) {
	const order = await findOrderById(orderId);
	order.orderStatus = "PLACED";
	order.paymentDetails.status = "COMPLETED";
	return await oreer.save();
}

async function confirmedOrder(orderId) {
	const order = await findOrderById(orderId);
	order.orderStatus = "CONFIRMED";
	return await oreer.save();
}

async function shipOrder(orderId) {
	const order = await findOrderById(orderId);
	order.orderStatus = "SHIPPED";
	return await oreer.save();
}

async function deliverOrder(orderId) {
	const order = await findOrderById(orderId);
	order.orderStatus = "DELIVER";
	return await oreer.save();
}

async function cancelledOrder(orderId) {
	const order = await findOrderById(orderId);
	order.orderStatus = "CANCELLED";
	return await oreer.save();
}

async function findOrderById(orderId) {

	//const order = await Order.findById(orderId).populate("user").populate({ path: "orderItems", populate: { path: "product" } }).populate("shippingAddress");
	const order = await Order.findById(orderId).populate({ path: "orderItems", populate: { path: "product" } });
	console.log("order is : ", order)
	return order;
}

async function userOrderHistory(userId) {
	try {
		const orders = await Order.find({ user: userId, orderStatus: "PLACED" }).populate({ path: "orderItems", populate: { path: "product" } }).lean();
		return orders;
	} catch (error) {
		throw new Error(error.message)
	}
}

async function getAllOrders() {
	return await Order.find({ user: userId, orderStatus: "PLACED" }).populate({ path: "orderItems", populate: { path: "product" } }).lean()
}

async function deleteOrder(orderId) {
	const order = await findOrderById(roderId);
	await Order.findByIdAndDelete(order._id);
}

module.exports = {
	createOrder,
	placeOrder,
	confirmedOrder,
	shipOrder,
	deleteOrder,
	getAllOrders,
	findOrderById,
	userOrderHistory,
	deliverOrder,
	cancelledOrder
}

