import React,{ Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import Business from './business/business';
import Newbusiness from './business/new_business';
import Editbusiness from './business/edit_business';
import NewDeal from './deals/new_deal';
import Users from './users/users';
import Influencers from './users/influencers';
import Inbox from './inbox/inbox';
import Newmessages from './inbox/new_messages';
import Editmessage from './inbox/edit_message';
import Homedeals from './deals/homedeals';
import Editdeal from './deals/edit_deal';
import Codeqr from './deals/codeqr';
import Printqr from './deals/printqr';

import './App.css';

class App extends Component {
	render() {
	    return (
	    	<BrowserRouter>	    	         
	            <Sidebar></Sidebar>
	            <Switch>
	            	<Route 
	            		path="/index"
	            		component={ Business } />
	            	<Route 
	            		path="/newbusiness"
	            		component={ Newbusiness } />	            		
	            	<Route 
	            		path="/editbusiness/:title"
	            		component={ Editbusiness } />
	            	<Route 
	            		path="/newdeal/:businessid"
	            		component={ NewDeal } />
	            	<Route 
	            		path="/users"
	            		component={ Users } />
	            	<Route 
	            		path="/influencers"
	            		component={ Influencers } />
	            	<Route 
	            		path="/newmessages"
	            		component={ Newmessages } />
	            	<Route 
	            		path="/editmessage/:mjsid"
	            		component={ Editmessage } />	            		
	            	<Route 
	            		path="/inbox"
	            		component={ Inbox } />
	            	<Route 
	            		path="/deals/:businessid"
	            		component={ Homedeals } />
	            	<Route 
	            		path="/editdeals/:businessid/:pdealid"
	            		component={ Editdeal } />
	            	<Route
	            		path="/codeqr/:pdealid"
	            		component={ Codeqr } />	            		
	            	<Route 
	            		path="/onecodeqr/:idqr"
	            		component={ Printqr } />
	            </Switch>
	        </BrowserRouter>
	    );
	}
}

export default App;