import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '.../../../public/css/sb-admin-2.css';
// import '.../../../public/vendor/fontawesome-free/css/all.min.css'


class Sidebar extends Component {
  render() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

          <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/index">
            <div className="sidebar-brand-text mx-3">Influme Backstage</div>
          </Link>

          <hr className="sidebar-divider my-0" />

          <li className="nav-item">
            <Link to="/index" className="nav-link">
              <i className="fas fa-map-marker-alt"></i>
              <span>Business</span>
            </Link>
          </li>


          <li className="nav-item">
            <Link to="/users" className="nav-link">
              <i className="fas fa-users"></i>
              <span>Users List</span>            
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/influencers" className="nav-link">
              <i className="fas fa-user-tie"></i>
              <span>Influencers Requests</span>            
            </Link>          
          </li>

          <li className="nav-item">
            <Link to="/inbox" className="nav-link">
              <i className="fas fa-user-tie"></i>
              <span>Inbox</span>            
            </Link>          
          </li>          

        </ul>

    );
  }

}
export default Sidebar;