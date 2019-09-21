const Dealsprofile = require('../controllers/dealsprofile');

module.exports = api => {
	api.route('/dealsprofile').get(Dealsprofile.list);
	api.route('/dealsprofile/filter/by/:bussinesid').get(Dealsprofile.list_by_business);
	// api.route('/dealsprofile/:nameMarker').get(Dealsprofile.get);
	api.route('/dealsprofile/filter').get(Dealsprofile.get);
	api.route('/dealsprofile/filter/by/:markerId').get(Dealsprofile.get_deals_available_by_marker);
	api.route('/dealsprofile/:markerId').get(Dealsprofile.getDeals);
	api.route('/dealsprofile/onedeal/:dealId').get(Dealsprofile.getOneDeal);
	api.route('/dealsprofile/update/:dealId').put(Dealsprofile.put);
	api.route('/dealsprofile/filter/hotdeals').get(Dealsprofile.getTrendingDeals);
	api.route('/dealsprofile/').post(Dealsprofile.post);
	api.route('/dealsprofile/delete/:dealid').delete(Dealsprofile.delete);
	api.route('/dealsprofile/onedeal/edit/:dealId').get(Dealsprofile.get_dealandbusiness);
	

	// api.route('/markerprofile/').post(Typemarker.post);
	// api.route('/users/:userId').delete(User.delete);
};