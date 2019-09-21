import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Inbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
        row_messages: []
    };

    this.handleClick = this.handleClick.bind(this);
	

  }

  componentDidMount(){
    axios.get('/inboxmessages/query/all')
      .then(response => this.setState({row_messages: response.data}));
  }


  handleClick(userId, idClick) {
  
  	
  	this.setResponseUser(userId,idClick).then((responseUser)=>{
  		console.log(responseUser);
  	})
    .catch( error => {

        if (error.response) {
          console.log(error.response.status);

        }else if (error.request) {            
          console.log(error.request);

        } else {                
          console.log(error.message);

        }

    });    	

  }

  setResponseUser(msjId, clickResponse){
      const url = '/inboxmessages/update/'+msjId;
      const config = {
          headers: {
              'content-type': 'application/json'
          }
      }
		let bodyMsj = {
			enabled: false
        }      

      return axios.put(url, bodyMsj, config);
  }

  render() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar></Topbar>

					<div className="container-fluid">

			          
			          <h1 className="h3 mb-2 text-gray-800">Inbox Messages</h1>
			          <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the official DataTables documentation.</p>

			          
			          <div className="card shadow mb-4">
			            <div className="card-header py-3">
                        <Link to="/newmessages" className="nav-link">
                            <button>Add new messages</button>
                        </Link>    
			            </div>
			            <div className="card-body">
			              <div className="table-responsive">
			                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
			                  <thead>
			                    <tr>
			                      <th>Title</th>
                            <th>Title Deal</th>
                            <th>Business Deal</th>
			                      <th>Date post</th>
			                      <th>Expiration date</th>
			                      <th>Delete</th>
			                    </tr>
			                  </thead>
			                  <tbody>
			                  {
			                  	this.state.row_messages.map((item) => {
                                    return (<tr key={item._id}>
	                                           <td><Link to={`/editmessage/${item._id}`} className="nav-link">{item.title}</Link></td>
                                             <td>{item.dealid.title}</td>
                                             <td>{item.dealid.markerid.title}</td>
	                                           <td>{(item.datepost.split("T"))[0]}</td>
	                                           <td>{(item.expirationdate.split("T"))[0]}</td>											   
											   <td><button type="button" className="btn btn-danger" onClick={ () => this.handleClick(item._id, false)}>Delete</button></td>	                                           
                                            </tr>);


                                })
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
export default Inbox;