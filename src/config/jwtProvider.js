//const jwt = require("jsonwebtoken");
//const SECRET_KEY = "4k5j8df7";
//
//const generateToken = (userId) => {
//	const tokenMain = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "488h" })
//	return tokenMain;
//}
//
//const getUserIdFromToken = (token) => {
//	const decodedToken = jwt.verify(token, SECRET_KEY);
//	console.log("decoded token is : " + decodedToken);
//	return decodedToken.userId;
//}
//module.exports = { generateToken, getUserIdFromToken };


const jwt = require("jsonwebtoken");


//const SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret";  // Use environment variable for security
//const SECRET_KEY = "4k5j8df7";



const SECRET_KEY = process.env.VITE_JWT_SECRET;




// Generate a JWT for the given userId with an expiration time of 488 hours
const generateToken = (userId) => {
	return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "488h" });
};



// Extract and return userId from a given JWT, handling any token verification errors
//const getUserIdFromToken = (token) => {
//	try {
//		const decodedToken = jwt.verify(token, SECRET_KEY);
//		console.log("decoded token is : ");
//		console.log(decodedToken);
//		console.log(decodedToken.userId);
//
//		return decodedToken.userId;
//	} catch (error) {
//		throw new Error("Invalid or expired token");  // Error handling for token verification failures
//	}
//};

const getUserIdFromToken = (token) => {
	try {
		// Decode the JWT token and extract the user ID
		const decodedToken = jwt.verify(token, SECRET_KEY);

		// Return the user ID
		return decodedToken.userId;

	} catch (error) {
		throw new Error("Invalid or expired token");
	}
};
module.exports = { generateToken, getUserIdFromToken };


