const mongoose = require("mongoose")
const connectionState = mongoose.connection.readyState;
console.log("connectionState is : ", connectionState)
const mongodbUrl = process.env.VITE_MONGO_URI

const connectDb = () => {
	return mongoose.connect(mongodbUrl);
}
module.exports = { connectDb };