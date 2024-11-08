const productService = require("../services/product.service")


async function createProduct(req, res) {
	try {

		const product = await productService.createProduct(req.body);
		console.log(`product is : ${product}`);
		return res.status(201).send(product);

	} catch (error) {
		console.log(`error in createproduct : ${req.body}`);

		return res.status(500).send({ error: error.message });

	}
}


const deleteProduct = async (req, res) => {
	const productId = req.params.id;

	try {

		const product = await productService.deleteProduct(productId);
		return res.status(201).send(product);

	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
}


const updateProduct = async (req, res) => {
	const productId = req.params.id;

	try {

		const product = await productService.updateProduct(productId, req.body);
		return res.status(201).send(product);

	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
}


const findProductById = async (req, res) => {
	const productId = req.params.id;

	try {

		const product = await productService.findProductById(productId);
		return res.status(201).send(product);

	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
}


const getAllProducts = async (req, res) => {
	const productId = req.params.id;

	try {
		console.log("wearehere********************************************")
		const product = await productService.getAllProducts(req.query);
		//console.log("req query is :  : : : : : : : : : : :  :   :  : :  :" + req.query)
		return res.status(202).send(product);

	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
}

const createMultipleProduct = async (req, res) => {
	const productId = req.params.id;

	try {

		const product = await productService.createMultipleProduct(req.body);
		return res.status(201).send({ message: "Product Created Successfully" });

	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
}

module.exports = {
	createProduct,
	deleteProduct,
	updateProduct,
	createMultipleProduct,
	getAllProducts,
	findProductById,

}








