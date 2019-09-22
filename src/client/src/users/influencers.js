import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';


class Influencers extends Component {

  constructor(props) {
    super(props);
    this.state = {
        row_users: []
    };

    this.handleClick = this.handleClick.bind(this);
	

  }

  componentDidMount(){
    axios.get('/users/search/all/request')
      .then(response => this.setState({row_users: response.data}));
  }


  handleClick(userId, idClick) {

  	
  	this.setResponseUser(userId,idClick).then((responseUser)=>{
  		console.log(responseUser);

      window.location.reload(false);

  	})
    .catch( error => {

        if (error.response) {
          console.log(error.response.status);

        }else if (error.request) {            
          console.log(error.request);

        } else {                
          console.log(error.message);

        }
        window.location.reload(false);
    });    	

  }

  setResponseUser(idUser, clickResponse){
      const url = '/users/update/'+idUser;
      const config = {
          headers: {
              'content-type': 'application/json'
          }
      }
    	let bodyUser = {
			approvedinfluencer: clickResponse
        }      

      return axios.put(url, bodyUser, config);
  }

  render() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar></Topbar>

					<div className="container-fluid">

			          
			          <h1 className="h3 mb-2 text-gray-800">Users List</h1>
			          <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the official DataTables documentation.</p>

			          
			          <div className="card shadow mb-4">
			            <div className="card-header py-3">
			              <span>Users List</span>
			            </div>
			            <div className="card-body">
			              <div className="table-responsive">
			                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
			                  <thead>
			                    <tr>
			                      <th>Name</th>
			                      <th>Nickname</th>
			                      <th>Email</th>
			                      <th>Instagram User</th>
			                      <th>Accept</th>
			                      <th>Decline</th>
			                    </tr>
			                  </thead>
			                  <tbody>
			                  {
			                  	this.state.row_users.map((item) => {
                                    return (<tr key={item._id}>
	                                           <td>{item.name}</td>
	                                           <td>{item.username}</td>
	                                           <td>{item.email}</td>
	                                           <td>{item.username}</td>

											   <td><button type="button" className="btn btn-success" onClick={ () => this.handleClick(item._id, true)}>Accept</button></td>
											   <td><button type="button" className="btn btn-danger" onClick={ () => this.handleClick(item._id, false)}>Decline</button></td>	                                           
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
export default Influencers;