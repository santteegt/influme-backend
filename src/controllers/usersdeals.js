// import async from 'async';
// import validator from 'validator';

const Usersdeals  = require('../models/usersdeals');
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

	// 	// Usersdeals.findByTitle(req.params.id)
	// 	Usersdeals.find({})

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

	// 	// Usersdeals.findByTitle(req.params.id)
	// 	Usersdeals.count({userid: req.params.userid, markerid: req.params.markerid, status: true})
	// 	// Usersdeals.find({title: { "$regex": '.*' + req.params.titlemarker + '.*', "$options": 'i' }}).populate(
	// 	// {
	//  //  		path: 'type',
	//  //  		model: 'Typemarker'
	// 	// })
	// 	// Usersdeals.findById(req.params.markerId)
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

// exports.get = (req, res) => {

// 		// Usersdeals.findByTitle(req.params.id)
// 		Usersdeals.find({userid: req.params.userid, dealid: req.params.dealid})
// 		// Usersdeals.find({title: { "$regex": '.*' + req.params.titlemarker + '.*', "$options": 'i' }}).populate(
// 		// {
// 	 //  		path: 'type',
// 	 //  		model: 'Typemarker'
// 		// })
// 		// Usersdeals.findById(req.params.markerId)
// 		// Dealsprofile.find({ date_expire: {"$gte": todayStart}})
// 			.then(
// 				marker => {
// 					res.json(marker);		
// 				}
// 			)
// 			.catch(err => {
// 				logger.error(err);
// 				res.status(422).send(err.errors);
// 			});
// };


// exports.put = (req, res) => {

// 	console.log(req);
// 	const data = req.body || {};

// 	Usersdeals.findOneAndUpdate({ userid: req.params.userid, markerid: req.params.markerid }, data, { new: true })
// 		.then(marker => {
// 			if (!marker) {
// 				return res.sendStatus(404);
// 			}
// 			res.json(marker);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };

exports.list = (req, res) => {
	// console.log("[*] GET" + req.params.nameMarker);
	console.log("[*] GET lista");

	// Markerprofile.findByTitle(req.params.id)
	Usersdeals.find({userid: req.params.userId}).populate(
	{
 		path: 'dealid',
 		model: 'Dealsprofile'
	})
	.then(
			dealslist => {
				res.json(dealslist);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

// exports.get = (req, res) => {

// 	console.log("USERDEALS " + req.params.userId);

// 	Usersdeals.find({ userid: req.params.userId}
// 		// )
// 	// .populate(
// 	// {
//  //  		path: 'dealid',
//  //  		model: 'Dealsprofile'
// 	// }
// 	).then( responseuserdeal => {
// 		res.json(responseuserdeal);
// 		console.log(res);
// 	}).catch(err => {
// 		logger.error(err);
// 		res.status(422).send(err.errors);
// 	});
		
// };

exports.get = (req, res) => {

	Usersdeals.find({ userid: req.params.userId, dealid: req.params.dealId}
	).then( responseuserdeal => {
		res.json(responseuserdeal);
		console.log(res);
	}).catch(err => {
		logger.error(err);
		res.status(422).send(err.errors);
	});
		
};

exports.post = (req, res) => {

	var dealsToDeals = new Usersdeals(req.body);
	// const data = Object.assign({}, req.body) || {};
	// console.log("[*]" + JSON.stringify(markerp));

	dealsToDeals.save()
		.then(dealuser => {
			res.json(dealuser);
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