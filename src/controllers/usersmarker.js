// import async from 'async';
// import validator from 'validator';

const Usersmarker  = require('../models/usersmarker');
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

	// exports.list = (req, res) => {

	// 	// Usersmarker.findByTitle(req.params.id)
	// 	Usersmarker.find({})

	// 		.then(
	// 			followmarker => {
	// 				res.json(followmarker);		
	// 			}
	// 		)
	// 		.catch(err => {
	// 			logger.error(err);
	// 			res.status(422).send(err.errors);
	// 		});
	// };

	// exports.getCountRecords = (req, res) => {

	// 	// console.log("[*] GET");

	// 	// Usersmarker.findByTitle(req.params.id)
	// 	Usersmarker.count({userid: req.params.userid, markerid: req.params.markerid, status: true})
	// 	// Usersmarker.find({title: { "$regex": '.*' + req.params.titlemarker + '.*', "$options": 'i' }}).populate(
	// 	// {
	//  //  		path: 'type',
	//  //  		model: 'Typemarker'
	// 	// })
	// 	// Usersmarker.findById(req.params.markerId)
	// 	// Dealsprofile.find({ date_expire: {"$gte": todayStart}})
	// 		.then(
	// 			marker => {
	// 				res.json(marker);		
	// 			}
	// 		)
	// 		.catch(err => {
	// 			logger.error(err);
	// 			res.status(422).send(err.errors);
	// 		});
	// };

exports.get = (req, res) => {

		// Usersmarker.findByTitle(req.params.id)
		Usersmarker.find({userid: req.params.userid, markerid: req.params.markerid})
		// Usersmarker.find({title: { "$regex": '.*' + req.params.titlemarker + '.*', "$options": 'i' }}).populate(
		// {
	 //  		path: 'type',
	 //  		model: 'Typemarker'
		// })
		// Usersmarker.findById(req.params.markerId)
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


exports.put = (req, res) => {

	console.log(req);
	const data = req.body || {};

	Usersmarker.findOneAndUpdate({ userid: req.params.userid, markerid: req.params.markerid }, data, { new: true })
		.then(marker => {
			if (!marker) {
				return res.sendStatus(404);
			}
			res.json(marker);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.post = (req, res) => {
	var followmarker = new Usersmarker(req.body);
	// const data = Object.assign({}, req.body) || {};
	// console.log("[*]" + JSON.stringify(markerp));

	followmarker.save()
		.then(markerf => {
			res.json(markerf);
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