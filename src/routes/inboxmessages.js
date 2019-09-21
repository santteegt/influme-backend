const Inboxmessages = require('../controllers/inboxmessages');

module.exports = api => {
	// api.route('/inboxmessages').get(Inboxmessages.list);
	// api.route('/dealsprofile/:nameMarker').get(Dealsprofile.get);
	api.route('/inboxmessages/query/all').get(Inboxmessages.get_all_msj);	
	api.route('/inboxmessages').get(Inboxmessages.get);
	api.route('/inboxmessages/query/:msjid').get(Inboxmessages.get_one_msj);
	api.route('/inboxmessages/save').post(Inboxmessages.post);
	api.route('/inboxmessages/update/:msjid').put(Inboxmessages.put);
	// api.route('/inboxmessages/:markerId').get(Inboxmessages.getDeals);
	// api.route('/inboxmessages/onedeal/:dealId').get(Inboxmessages.getOneDeal);
	// api.route('/inboxmessages/update/:dealId').put(Inboxmessages.put);
	// api.route('/inboxmessages/filter/hotdeals').get(Inboxmessages.getTrendingDeals);
	// api.route('/inboxmessages/').post(Inboxmessages.post);

	// api.route('/markerprofile/').post(Typemarker.post);
	// api.route('/users/:userId').delete(User.delete);
};