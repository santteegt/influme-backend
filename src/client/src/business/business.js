import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Business extends Component {

  constructor(props) {
    super(props);
    this.state = {
        row_business: [],
        element_bussines: []
    };
  }

  componentDidMount(){
    axios.get('/markerprofile/business/all').then(responseBusiness => {  

        let arrayAvailables = []     
        
        responseBusiness.data.forEach( (objB, index) => {

            let countDeals = 0;
            
            axios.get('/dealsprofile/filter/by/'+objB._id)
                .then(responseDeals => {

                    if(responseDeals==null){
                      console.log(objB.title + " # 0");
                      arrayAvailables.splice(index, 0, 0);
                    } else if(responseDeals.lenght ===0){
                      console.log(objB.title + " # 0");
                      arrayAvailables.splice(index, 0, 0);
                    }else {                    
                        responseDeals.data.forEach( objD => {

                          countDeals = countDeals + (objD.total_tickets - objD.used_tickets);
                          
                        });  
                    }

                    console.log(objB.title + " # "+ countDeals);
                   arrayAvailables.splice(index, 0, countDeals);
                  
                  this.setState({row_business: responseBusiness.data, element_bussines: arrayAvailables})

                });                      
        });     

      });
  }

  printAvailables(i){
    return this.state.element_bussines[i];
  }


  render() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar></Topbar>
                <div className="container-fluid">
                    <h1 className="h3 mb-2 text-gray-800">Business</h1>
                    <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the official DataTables documentation.</p>
                </div>

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        {/* <a className="nav-link" href="new_business.html"> */}
                        <Link to="/newbusiness" className="nav-link">
                            <button>Add new business</button>
                        </Link>
                        </div>
                        <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                    <th>Name</th>
                                    <th>Business Type</th>
                                    <th>Address</th>
                                    <th>Website</th>
                                    <th>Facebook User</th>
                                    <th>Instagram User</th>
                                    <th>Available Deals</th>
                                    <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   
                                        this.state.row_business.map((item, index, array) => {
                                            return (
                                                    <tr key={item._id}>
                                                       <td><Link to={`/deals/${item._id}`} className="nav-link">{item.title}</Link></td>
                                                       <td>{item.type.description}</td>
                                                       <td>{item.address}</td>
                                                       <td>{item.web}</td>
                                                       <td>{item.instagramid}</td>
                                                       <td>{item.instagramid}</td>
                                                       <td>{this.printAvailables(index)}</td>
                                                       <td><Link className="nav-link" to={`/editbusiness/${item.title}`}><button><i className="far fa-edit"></i></button></Link></td>
                                                    </tr>);
                                        })
                                    }                            

                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>    
                    <Footer></Footer>                            
            </div>
        </div>
    );
  }

}
export default Business;