import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';

class Editmessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	id_business: '',
        row_business: [],
        row_deals: [],
        form: {         
          _id: '',
          title: '',
          description: '',
          datepost: Date,
          expirationdate: Date,
          dealid: ''
        }
      };
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBusiness = this.handleChangeBusiness.bind(this);                  

  }

  componentDidMount(){

  	const { mjsid} = this.props.match.params;

    axios.get('/markerprofile/business/all')
      .then(responseBusiness => 
      {	    
      		this.setState({row_business: responseBusiness.data})  	      	

			axios.get('/inboxmessages/query/'+mjsid).then(responseMsj => {
				

		      	let msj_record = this.state;
		      	msj_record.form['_id'] = responseMsj.data[0]._id;
  				msj_record.form['title'] = responseMsj.data[0].title;
  				msj_record.form['description'] = responseMsj.data[0].description;
  				var res_date_expire = responseMsj.data[0].datepost.split("T");
  				msj_record.form['datepost'] = res_date_expire[0];
  				var res_datepost = responseMsj.data[0].expirationdate.split("T");
  				msj_record.form['expirationdate'] = res_datepost[0];
  				msj_record.form['dealid'] = responseMsj.data[0].dealid._id;

				console.log("* mensaje record " + JSON.stringify(msj_record.form));

  				this.setState({msj_record, id_business: responseMsj.data[0].dealid.markerid})

				axios.get('/dealsprofile/filter/by/'+responseMsj.data[0].dealid.markerid).then(responseDeals => {

					this.setState({row_deals: responseDeals.data});

				});

			});      		

      		
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

    }).catch( error => {

            if (error.response) {
              console.log(error.response.status);
            }else if (error.request) {            
              console.log(error.request);
            } else {                
              console.log('Error', error.message);
            }

    });

  }
 
  rowSave(){
      const url = '/inboxmessages/update/'+this.state.form._id;
      const config = {
          headers: {
              'content-type': 'application/json'
          }
      }
      return axios.put(url, this.state.form, config);
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
                            <h4>Edit Messages</h4>
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
                                <select name="type" className="form-control" value={this.state.id_business} onChange={this.handleChangeBusiness} required>
                                    <option value="Select..">Select..</option>
                                    {(this.state.row_business || []).map(item => (
                                        <option key={item._id} value={item._id}>{item.title}</option>
                                      ))}
                                </select>                                
                                
                            </div>
                            <div className="form-group">
                                <label>Deals</label>
                                <select name="dealid" className="form-control" value={form.dealid} onChange={this.handleChange} required>
                                    <option value="Select..">Select..</option>
                                    {(this.state.row_deals || []).map(item => (
                                        <option key={item._id} value={item._id}>{item.title}</option>
                                      ))}
                                </select>                                
                                
                            </div>

                            <div className="form-group">
                                <label>Post date</label>
                                <input name="datepost" value={form.datepost} type="date" className="form-control" placeholder="Enter post date" onChange={this.handleChange} required readOnly/>

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
export default Editmessage;