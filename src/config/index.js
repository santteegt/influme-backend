require('dotenv').config({ path: './.env' });

export default {
	env: process.env.NODE_ENV || 'development',
	server: {
		port: !process.env.NODE_ENV ? 3000:process.env.PORT
	},
	logger: {
		host: process.env.LOGGER_HOST, // Papertrail Logging Host
		port: process.env.LOGGER_PORT, // Papertrail Logging Port
	},
	database: {
		uri: !process.env.NODE_ENV ? "mongodb://localhost/influme":process.env.MONGODB_URI
	}
};