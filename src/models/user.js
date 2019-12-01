const mongoose  = require('mongoose');
const bcrypt  = require('mongoose-bcrypt');
const timestamps  = require('mongoose-timestamp');
const mongooseStringQuery  = require('mongoose-string-query');

const logger  = require('../utils/logger');
// import email from '../utils/email';
// import events from '../utils/events';

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			lowercase: true,
			trim: true,
			// index: true,
			unique: true,
			required: true
		},

		tokenaccess: {
			type: String,
			lowercase: true,

			// index: true,
			unique: true,
			required: true
		},

		refreshtoken: {
			type: String,
			lowercase: true,
			// index: true,
			unique: true,
			required: true
		},


		token_detail: {
			type: String,
			trim: true,
			required: true
		},		
			
		raw_profile: {
			type: String,
			trim: true,
			required: true
		},		

		name: {
			type: String,
			trim: true,
			required: true
		},

		city: {
			type: String,
			trim: true,
			required: true
		},

		picturehome: {
			type: String,
			required: true
		},

		followers: {
			type: Number,
			required: true
		},

		following: {
			type: Number,
			required: true
		},				

		email: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: true
		},

		approvedinfluencer: {
			type: Boolean,						
			required: false
		},

		influencer: {
			type: Boolean,
			default: false
		}

	},
	{ collection: 'users' }
);

// UserSchema.pre('save', function(next) {
// 	if (!this.isNew) {
// 		next();
// 	}

	// email({
	// 	type: 'welcome',
	// 	email: this.email
	// })
	// 	.then(() => {
	// 		next();
	// 	})
	// 	.catch(err => {
	// 		logger.error(err);
	// 		next();
	// 	});
// });

// UserSchema.pre('findOneAndUpdate', function(next) {
// 	// if (!this._update.recoveryCode) {
// 	// 	return next();
// 	// }

// 	// email({
// 	// 	type: 'password',
// 	// 	email: this._conditions.email,
// 	// 	passcode: this._update.recoveryCode
// 	// })
// 	// 	.then(() => {
// 	// 		next();
// 	// 	})
// 	// 	.catch(err => {
// 	// 		logger.error(err);
// 	// 		next();
// 	// 	});
// });

// UserSchema.plugin(bcrypt);
// UserSchema.plugin(timestamps);
// UserSchema.plugin(mongooseStringQuery);

// UserSchema.index({ email: 1, username: 1 });

module.exports = exports = mongoose.model('User', UserSchema);