const Dealsprofile = require('../controllers/dealsprofile');

module.exports = api => {
	api.route('/dealsprofile').get(Dealsprofile.list);
	// api.route('/dealsprofile/:nameMarker').get(Dealsprofile.get);
	api.route('/dealsprofile/filter').get(Dealsprofile.get);
	api.route('/dealsprofile/:markerId').get(Dealsprofile.getDeals);
	api.route('/dealsprofile/onedeal/:dealId').get(Dealsprofile.getOneDeal);
	api.route('/dealsprofile/update/:dealId').put(Dealsprofile.put);
	api.route('/dealsprofile/filter/hotdeals').get(Dealsprofile.getTrendingDeals);
	api.route('/dealsprofile/').post(Dealsprofile.post);

	// api.route('/markerprofile/').post(Typemarker.post);
	// api.route('/users/:userId').delete(User.delete);
};