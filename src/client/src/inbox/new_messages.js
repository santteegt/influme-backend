import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';

class Newmessages extends Component {

  constructor(props) {
    super(props);
    this.state = {
        row_business: [],
        row_deals: [],
        form: {         
          title: '',
          description: '',
          datepost: Date,
          expirationdate: Date,
          dealid: '',
          enabled: true
        }
      };
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBusiness = this.handleChangeBusiness.bind(this);                  

  }

  componentDidMount(){
	    axios.get('/markerprofile/business/all')
	      .then(response => {	      	
	      	this.setState({row_business: response.data})
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

  handleChangeBusiness(e) {
  
	axios.get('/dealsprofile/filter/by/'+e.target.value)
		.then(response => this.setState({row_deals: response.data}))
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

  handleChange(e) {

      e.persist();
      let store = this.state;
      store.form[e.target.name] = e.target.value;
      this.setState(store);   
  }  

  onFormSubmit(e){
 
    e.preventDefault() // Stop form submit
 

	this.rowSave().then((responseFinal)=>{

          console.log(responseFinal);

          this.props.history.push('/inbox');

    }).catch( error => {

            if (error.response) {
              console.log(error.response.status);
            }else if (error.request) {            
              console.log(error.request);
            } else {                
              console.log('Error', error.message);
            }
            
            this.props.history.push('/inbox');

    });

  }
 
  rowSave(){
      const url = '/inboxmessages/save';
      const config = {
          headers: {
              'content-type': 'application/json'
          }
      }
      return axios.post(url, this.state.form, config);
  }

  render() {
    const { form } = this.state;
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar></Topbar>
                <div className="container-fluid">
                    <h1 className="h3 mb-2 text-gray-800">Inbox</h1>
                    <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the official DataTables documentation.</p>

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h4>New Messages</h4>
                        </div>
                        <div className="card-body">
                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input name="title" type="text" value={form.title} className="form-control" onChange={this.handleChange} placeholder="Enter business name" required/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={form.description} className="form-control" onChange={this.handleChange} placeholder="Enter business name" required/>
                            </div>                            
                            <div className="form-group">
                                <label>Business</label>
                                <select name="type" className="form-control" onChange={this.handleChangeBusiness} required>
                                    <option value="Select..">Select..</option>
                                    {(this.state.row_business || []).map(item => (
                                        <option key={item._id} value={item._id}>{item.title}</option>
                                      ))}
                                </select>                                
                                
                            </div>
                            <div className="form-group">
                                <label>Deals</label>
                                <select name="dealid" className="form-control" onChange={this.handleChange} required>
                                    <option value="Select..">Select..</option>
                                    {(this.state.row_deals || []).map(item => (
                                        <option key={item._id} value={item._id}>{item.title}</option>
                                      ))}
                                </select>                                
                                
                            </div>

                            <div className="form-group">
                                <label>Post date</label>
                                <input name="datepost" value={form.datepost} type="date" className="form-control" placeholder="Enter post date" onChange={this.handleChange} required/>

                            </div>
                            <div className="form-group">
                                <label>Expiration date</label>
                                <input name="expirationdate" value={form.expirationdate} type="date" className="form-control" placeholder="Enter expiration date" onChange={this.handleChange} required/>

                            </div>                            
                                                                                    

                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
  }

}
export default Newmessages;