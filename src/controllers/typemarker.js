// import async from 'async';
// import validator from 'validator';

const Typemarker  = require('../models/typemarker');
// import Follow from '../models/follow';

const logger  = require('../utils/logger');

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

exports.list = (req, res) => {
	// console.log("[*] GET" + req.params.nameMarker);

	// Markerprofile.findByTitle(req.params.id)
	Typemarker.find({})

		.then(
			typemarker => {
				res.json(typemarker);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.get = (req, res) => {
	// console.log("[*] GET" + req.params.nameMarker);
	console.log("[*] GET" + req.params.id);

	Typemarker.findById(req.params.id)
	// Typemarker.find({title: req.params.id})

		.then(
			typemarker => {
				res.json(typemarker);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

// exports.put = (req, res) => {
// 	const data = req.body || {};

// 	if (data.email && !validator.isEmail(data.email)) {
// 		return res.status(422).send('Invalid email address.');
// 	}

// 	if (data.username && !validator.isAlphanumeric(data.username)) {
// 		return res.status(422).send('Usernames must be alphanumeric.');
// 	}

// 	User.findByIdAndUpdate({ _id: req.params.userId }, data, { new: true })
// 		.then(user => {
// 			if (!user) {
// 				return res.sendStatus(404);
// 			}

// 			user.password = undefined;
// 			user.recoveryCode = undefined;

// 			res.json(user);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };

// exports.post = (req, res) => {
// 	var markerp = new Typemarker(req.body);
// 	// const data = Object.assign({}, req.body) || {};
// 	console.log("[*]" + JSON.stringify(markerp));

// 	markerp.save()
// 		.then(marker => {
// 			res.json(marker);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(500).send(err);
// 		});
// };

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