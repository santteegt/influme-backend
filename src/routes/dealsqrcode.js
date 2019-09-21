const Dealsqrcode = require('../controllers/dealsqrcode');

module.exports = api => {
	// api.route('/usersdeals/search/:userId').get(Dealsqrcode.list);
	// api.route('/usersdeals/search/one/:userId/:dealId').get(Dealsqrcode.get);
	api.route('/dealsqrcode/search/all/:userid').get(Dealsqrcode.list_dealsbyuser);
	api.route('/dealsqrcode/search/one/qr/:codeqr').get(Dealsqrcode.list_one_codeqr);
	api.route('/dealsqrcode/search/one/:codeqrid').get(Dealsqrcode.list_one_code);
	api.route('/dealsqrcode/search/:dealid').get(Dealsqrcode.list_by_deal);
	api.route('/dealsqrcode/save').post(Dealsqrcode.post);
	api.route('/dealsqrcode/delete/:dealcode').delete(Dealsqrcode.delete);
	api.route('/dealsqrcode/update/:codeqr').put(Dealsqrcode.put);
	
};