import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Marker from './marker/marker.js'
import Deals from './deals/deals.js'


const routing = (
<Router>
    <div>
      <ul>
        <li>
			<Link to="/store">Create Store</Link>
        </li>
        <li>
			<Link to="/deals">Create Deal</Link>
        </li>        

      </ul>
      <hr />
      <Switch>
        <Route path="/store" component={Marker} />
        <Route path="/deals" component={Deals} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

        // <li>
        //   <NavLink activeClassName="active" to="/stores">
        //     Stores
        //   </NavLink>
        // </li>