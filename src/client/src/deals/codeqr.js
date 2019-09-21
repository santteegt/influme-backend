import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Codeqr extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	markerid: '',
    	dealid: '',
        row_codeqr: [],
        row_business: [],
        row_deals: []
    };
	// this.handleChangeBusiness = this.handleChangeBusiness.bind(this);            
	// this.handleChange = this.handleChange.bind(this);            
  }

  componentDidMount(){

    const { pdealid } = this.props.match.params;

    axios.get('/dealsqrcode/search/'+pdealid)
      .then(response => {
        // console.log("dealscodqr: "+JSON.stringify(response.data));       
        this.setState({row_codeqr: response.data})        
    });     





   //  axios.get('/markerprofile/business/all')
   //    .then(response => this.setState({row_business: response.data}))
   //    .catch( error => {
		 //    if (error.response) {
		 //      console.log(error.response.status);

		 //    }else if (error.request) {            
		 //      console.log(error.request);

		 //    } else {                
		 //      console.log(error.message);

		 //    }
  	// });          		

  }

    

  // handleChange(e) {

    // axios.get('/dealsqrcode/search/'+pdealid)
    //   .then(response => {
    //     // console.log("dealscodqr: "+JSON.stringify(response.data));       
    //     this.setState({row_codeqr: response.data})        
    // });     
  // }	

 //  handleChangeBusiness(e) {
  
	// axios.get('/dealsprofile/filter/by/'+e.target.value)
	// 	.then(response => this.setState({row_deals: response.data}))
 //    	.catch( error => {

	//         if (error.response) {
	//           console.log(error.response.status);

	//         }else if (error.request) {            
	//           console.log(error.request);

	//         } else {                
	//           console.log(error.message);

	//         }

	//     });    	

 //  }

renderTableData() {
	console.log("dealscodqr: "+JSON.stringify(this.state.row_codeqr));      	
      return this.state.row_codeqr.map(codesqr => { 
         const { _id, isused, codeqr } = codesqr
         return (
            <tr key={_id}>
               <td>{codeqr}</td>
               <td>{(isused===false) ? 'No' : 'Yes'}</td>
               <td>      
               	<Link to={`/onecodeqr/${_id}`}>
               		<button className="btn btn-success">Ver</button>
               	</Link>
  			   </td>
            </tr>
         )
      })
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

			            <div className="card-body">
			              <div className="table-responsive">
			                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
			                  <thead>
			                    <tr>
			                      <th>CodeQR</th>
			                      <th>Is used</th>
			                      <th>QR</th>
			                    </tr>
			                  </thead>
			                  <tbody>
								{this.renderTableData()}			                  
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
export default Codeqr;