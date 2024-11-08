//const jwtProvider = require("../config/jwtProvider")
//const userService = require("../services/user.service")
//
//const authenticate = async (req, res, next) => {
//
//
//	//token
//	try {
//		const token = req.headers.authorization?.split(" ")[1];
//
//		if (!token) {
//			return res.status(404).send({ error: "token not found..............." })
//		}
//
//		const userId = jwtProvider.getUserIdFromToken(token);
//		const user = await userService.findUserById(userId);
//		req.user = user;
//	} catch (error) {
//		return res.status(500).send({ error: error.message });
//	}
//	next();
//}
//
//module.exports = authenticate;



const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");

const authenticate = async (req, res, next) => {
	try {
		// Get token from headers
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(404).send({ error: "Token not found ys" });
		}

		// Extract user ID from token
		const userId = jwtProvider.getUserIdFromToken(token);
		console.log("user id from authentication is : ", userId);
		// Fetch the user from the database (ensure we await this call)
		const user = await userService.findUserById(userId);

		if (!user) {
			return res.status(404).send({ error: "User not found" });
		}
		console.log("user from authenticdfgation dfdfis : ", user);

		console.log("the remove function started ******");
		// Attach user to request object
		req.user = user;
		console.log("user assigned successfully**********");

	} catch (error) {
		return res.status(500).send({ error: error.message });
	}

	// Proceed to the next middleware/controller
	next();
}

module.exports = authenticate;