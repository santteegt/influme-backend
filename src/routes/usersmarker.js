import Usersmarker from '../controllers/usersmarker';

module.exports = api => {
	// api.route('/usersmarker').get(Usersmarker.list);
	api.route('/usersmarker/:userid/:markerid').get(Usersmarker.get);
	// api.route('/usersmarker/:titlemarker').get(Usersmarker.get);

	api.route('/usersmarker/update/:userid/:markerid').put(Usersmarker.put);
	api.route('/usersmarker/').post(Usersmarker.post);
	// api.route('/usersmarker/:userfollowId').delete(Usersmarker.delete);
};