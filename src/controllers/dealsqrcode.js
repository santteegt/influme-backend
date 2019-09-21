const Dealsqrcode  = require('../models/dealsqrcode');

const logger  = require('../utils/logger');


// exports.list = (req, res) => {

// 	Dealsqrcode.find({userid: req.params.userId}).populate(
// 	{
//  		path: 'dealid',
//  		model: 'Dealsprofile'
// 	})
// 	.then(
// 			dealslist => {
// 				res.json(dealslist);		
// 			}
// 		)
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };


// exports.get = (req, res) => {

// 	Dealsqrcode.find({ userid: req.params.userId, dealid: req.params.dealId}
// 	).then( responseuserdeal => {
// 		res.json(responseuserdeal);
// 		console.log(res);
// 	}).catch(err => {
// 		logger.error(err);
// 		res.status(422).send(err.errors);
// 	});
		
// };codeqrid

exports.list_one_code = (req, res) => {
	
	Dealsqrcode.find({_id: req.params.codeqrid})

		.then(
			codeqr => {
				res.json(codeqr);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.list_one_codeqr = (req, res) => {
	
	Dealsqrcode.find({codeqr: req.params.codeqr, isused: false})

		.then(
			codeqr => {
				res.json(codeqr);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};


exports.list_dealsbyuser  = (req, res) => {

	Dealsqrcode.find({userid: req.params.userid}).populate(
	{
 		path: 'dealid',
 		model: 'Dealsprofile'
	})
		.then(
			dealsbyuser => {
				res.json(dealsbyuser);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});

};

exports.list_by_deal = (req, res) => {
	
	Dealsqrcode.find({dealid: req.params.dealid})

		.then(
			dealcodes => {
				res.json(dealcodes);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.post = (req, res) => {

	var dealsToDeals = new Dealsqrcode(req.body);

	dealsToDeals.save()
		.then(dealuser => {
			res.json(dealuser);
		})
		.catch(err => {
			logger.error(err);
			res.status(500).send(err);
		});
};

exports.put = (req, res) => {

	const data = req.body || {};


	Dealsqrcode.findOneAndUpdate({ codeqr: req.params.codeqr }, data, { new: true })
		.then(qrprofile => {
			if (!qrprofile) {
				return res.sendStatus(404);
			}

			res.json(qrprofile);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.delete = (req, res) => {
	Dealsqrcode.findOneAndDelete({_id: req.params.dealcode})
		.then(user => {

			res.sendStatus(204);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};
