require('dotenv').config({ path: './.env' });

module.exports = {
	env: process.env.NODE_ENV || 'development',
	server: {
		port: 3000
	},
	logger: {
		host: process.env.LOGGER_HOST, // Papertrail Logging Host
		port: process.env.LOGGER_PORT, // Papertrail Logging Port
	},
	database: {
		uri: !process.env.NODE_ENV ? "mongodb://localhost/influme":process.env.MONGODB_URI
	}
};
// export default result;