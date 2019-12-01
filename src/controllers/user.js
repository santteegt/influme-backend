const async  = require('async');
const validator  = require('validator');

const User  = require('../models/user');
// import Follow from '../models/follow';

const logger  = require('../utils/logger');

var AuthenticationClient = require('auth0').AuthenticationClient;

var auth0 = new AuthenticationClient({
  domain: 'devappmobile.auth0.com',
  clientId: 'u5l96Kp3uEDJ7PSfhH56WyHIJe4PaiXd'
});

// exports.list = (req, res) => {
// 	const params = req.params || {};
// 	const query = req.query || {};

// 	const page = parseInt(query.page, 10) || 0;
// 	const perPage = parseInt(query.per_page, 10) || 10;

// 	User.apiQuery(req.query)
// 		.select('name email username bio url twitter background')
// 		.then(users => {
// 			res.json(users);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };



exports.get_if_influencer = (req, res) => {

	User.find({ _id: req.params.userId })
		.then(
			dataUser => {
				res.json(dataUser);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.all_users = (req, res) => {	

	User.find({})
		.then(
			dataUser => {
				res.json(dataUser);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.all_users_request = (req, res) => {	

	User.find({ influencer: true, approvedinfluencer: null })
		.then(
			dataUser => {
				res.json(dataUser);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.single_user = (req, res) => {	

	User.find({ _id: req.params.userId })
		.then(
			dataUser => {

				var data = req.params.tkuser;
				var responseImg = {"newImgProfile": ""};

				// var data = {
				// 	accessToken: 'Tt2RmguiyqcrXHVLnwPR9CvX7TShqE7d'
				// };

				auth0.getProfile(data, function (err, userInfo) {
				  if (err) {
				    // Handle error.
				    console.log("Error.....");
				  }else{
					
					// dataUser.picture = ""; 	
				  	// console.log(userInfo.picture);

				  	responseImg.newImgProfile = userInfo.picture;
				  	// console.log("[*] 1. Image " + typeof(dataUser));
	  				console.log("[*] 1. Image " + JSON.stringify(userInfo));

	  				console.log("[*] 2. Image " + JSON.stringify(responseImg));

	  				res.json(responseImg);
				  	}

				  
				});

				

			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};


exports.list = (req, res) => {

	console.log("[*] GET" + req.params.username);

	User.find({name: { "$regex": '.*' + req.params.username + '.*', "$options": 'i' }})
		.then(
			dataUser => {
				res.json(dataUser);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.get = (req, res) => {
	console.log("[*]")
	User.findById(req.params.userId)
		.then(user => {
			user.password = undefined;
			user.recoveryCode = undefined;

			res.json(user);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.get = (req, res) => {
	console.log("[*]")
	User.findById(req.params.username)
		.then(user => {
			// user.password = undefined;
			// user.recoveryCode = undefined;

			res.json(user);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.put = (req, res) => {
	const data = req.body || {};

	if (data.email && !validator.isEmail(data.email)) {
		return res.json({'error': 'Invalid email address'});
	}

	// if (data.username && !validator.isAlphanumeric(data.username)) {
	// 	return res.status(422).send('Usernames must be alphanumeric.');
	// }

	User.findByIdAndUpdate({ _id: req.params.userId }, data, { new: true })
		.then(user => {
			if (!user) {
				return res.sendStatus(404);
			}

			user.password = undefined;
			user.recoveryCode = undefined;

			res.json(user);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.post = (req, res) => {

	var userPost = new User(req.body);

	if (userPost.email && !validator.isEmail(userPost.email)) {
		// return res.status(422).send('Invalid email address.');
		return res.json({'error': 'Invalid email address'});

	}

	console.log("Controller " + JSON.stringify(userPost));

	userPost.save()
	.then(usersave => {
		res.json(usersave);
	})
	.catch(err => {
		logger.error(err);
		res.status(500).send(err);
	});	
	// const data = Object.assign({}, req.body, { user: req.user.sub }) || {};

	// User.create(data)
	// 	.then(user => {
	// 		res.json(user);
	// 	})
	// 	.catch(err => {
	// 		logger.error(err);
	// 		res.status(500).send(err);
	// 	});
};

// exports.delete = (req, res) => {
// 	User.findByIdAndUpdate(
// 		{ _id: req.params.user },
// 		{ active: false },
// 		{
// 			new: true
// 		}
// 	)
// 		.then(user => {
// 			if (!user) {
// 				return res.sendStatus(404);
// 			}

// 			res.sendStatus(204);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };