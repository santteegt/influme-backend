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
	console.log("[*] GET lista");

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


exports.getInterests = (req, res) => {

	// var markerInterest = new Markerprofile(req.body);
	var markerInterest = req.params.idstypes.split(",");;
	// var minterests = [];
	// var minterests = markerInterest.type;

	console.log("[*] GET Intereses Query " + typeof(markerInterest));
		console.log("[*] GET Intereses Query II " + JSON.stringify(markerInterest));
		
		// console.log("[*] GET Intereses Query II " + JSON.stringify(req.body.type));
		// console.log("[*] GET Intereses Query III " + JSON.stringify(minterests));

	// Usersdeals.findByTitle(req.params.id)
	//Usersdeals.count({userid: req.params.userid, markerid: req.params.markerid, status: true})
	Markerprofile.find({type: { $in: markerInterest}})
		.then(
			markerInterestsResponse => {
				res.json(markerInterestsResponse);		
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

	// var markerp = new Markerprofile(req.body);
	// console.log(data);
	// console.log(JSON.stringify(data));
	// console.log(req);

	Markerprofile.findOneAndUpdate({ _id: req.params.markerId }, data, { new: true })
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