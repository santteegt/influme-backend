import Markerprofile from '../controllers/markerprofile';

module.exports = api => {
	api.route('/markerprofile').get(Markerprofile.list);
	// api.route('/markerprofile/:markerId').get(Markerprofile.get);
	api.route('/markerprofile/search/:titlemarker').get(Markerprofile.get);
	api.route('/markerprofile/:idstypes').get(Markerprofile.getInterests);
	api.route('/markerprofile/update/:markerId').put(Markerprofile.put);
	api.route('/markerprofile/').post(Markerprofile.post);
	// api.route('/users/:userId').delete(User.delete);
};