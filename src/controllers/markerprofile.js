// import async from 'async';
// import validator from 'validator';

import Markerprofile from '../models/markerprofile';
// import Follow from '../models/follow';

import logger from '../utils/logger';

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
	console.log("[*] GET");

	// Markerprofile.findByTitle(req.params.id)
	Markerprofile.find({})

		.then(
			marker => {
				res.json(marker);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.get = (req, res) => {
	console.log("[*] GET" + req.params.titlemarker);
	// console.log("[*] GET");

	// Markerprofile.findByTitle(req.params.id)
	// Markerprofile.find({title: req.params.titlemarker})
	Markerprofile.find({title: { "$regex": '.*' + req.params.titlemarker + '.*', "$options": 'i' }}).populate(
	{
  		path: 'type',
  		model: 'Typemarker'
	})
	// Markerprofile.findById(req.params.markerId)
	// Dealsprofile.find({ date_expire: {"$gte": todayStart}})

		.then(
			marker => {
				res.json(marker);		
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

exports.post = (req, res) => {
	var markerp = new Markerprofile(req.body);
	// const data = Object.assign({}, req.body) || {};
	console.log("[*]" + JSON.stringify(markerp));

	markerp.save()
		.then(marker => {
			res.json(marker);
		})
		.catch(err => {
			logger.error(err);
			res.status(500).send(err);
		});
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