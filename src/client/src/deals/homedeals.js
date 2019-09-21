import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';
import { Link } from 'react-router-dom';



class Homedeals extends Component {

  constructor(props) {
    super(props);
    this.state = {
        row_deals: []
    };


  }

  componentDidMount(){

    const { businessid } = this.props.match.params;

    axios.get('/dealsprofile/filter/by/'+businessid)
      .then(response => this.setState({row_deals: response.data}));
  }


  render() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar></Topbar>

					<div className="container-fluid">

			          
			          <h1 className="h3 mb-2 text-gray-800">Deals</h1>
			          <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the official DataTables documentation.</p>

			          
			          <div className="card shadow mb-4">
			            <div className="card-header py-3">
			            
                        <Link to={`/newdeal/${this.props.match.params.businessid}`} className="nav-link">
                            <button>Add new deal</button>
                        </Link>    
			            </div>
			            <div className="card-body">
			              <div className="table-responsive">
			                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
			                  <thead>
			                    <tr>
			                      <th>Title</th>
			                      <th>Total Tickets</th>
			                      <th>Expiration date</th>
                            <th>QRCodes</th>
			                    </tr>
			                  </thead>
			                  <tbody>
			                  {
			                  	this.state.row_deals.map((item) => (
			                  		<tr key={item._id}>
                                       <td><Link to={`/editdeals/${item.markerid}/${item._id}`} className="nav-link">{item.title}</Link></td>	                                           
                                       <td>{item.total_tickets}</td>
                                       <td>{(item.date_expire.split("T"))[0]}</td>
                                       <td><center><Link to={`/codeqr/${item._id}`} className="nav-link"><button type="button" className="btn btn-success">QR</button></Link></center></td>
                                    </tr>)
                                )
                               }

			                  </tbody>
			                </table>
			              </div>
			            </div>
			          </div>

			        </div>

    
                <Footer></Footer>                            
            </div>
        </div>
    );
  }

}
export default Homedeals;