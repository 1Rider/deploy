const userService = require("../services/user.service.js");

//const getUserProfile = async (req, res) => {
//	try {
//		const authHeader = req.headers.authorization;
//		const jwt = authHeader?.split(" ")[1];  // Extract JWT safely
//
//		console.log(`JWT received: ${jwt ? 'Present' : 'Missing'}`);  // Log safely
//
//		if (!jwt) {
//			return res.status(401).send({ error: "Token not found" });  // Use 401 for missing token
//		}
//
//		const user = await userService.getUserProfileByToken(jwt);
//		return res.status(200).send(user);
//
//	} catch (error) {
//		console.error(`Error in getUserProfile: ${error.message}`);  // Log error message for debugging
//		return res.status(500).send({ error: "Internal server error" });  // Generic message for production
//	}
//};

const getUserProfile = async (req, res) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			console.error("Authorization header is missing");
			return res.status(401).send({ error: "Authorization header missing" });
		}

		const jwt = authHeader.split(" ")[1];  // Extract JWT safely
		console.log(`JWT received: ${jwt}`);

		if (!jwt) {
			return res.status(401).send({ error: "Token not found" });  // Use 401 for missing token
		}

		const user = await userService.getUserProfileByToken(jwt);
		return res.status(200).send(user);

	} catch (error) {
		console.error(`Error in getUserProfile: ${error.message}`);  // Log error message for debugging
		return res.status(500).send({ error: `Failed to get user profile: ${error.message}` });  // Send detailed error message
	}
};












const getAllUsers = async (req, res,) => {
	try {
		const users = await userService.getAllUsers();
		return res.status(200).send(users);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}

}

module.exports = { getUserProfile, getAllUsers }