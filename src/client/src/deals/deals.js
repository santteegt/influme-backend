import React, { Component } from 'react';
import axios from 'axios';


class DealsApp extends Component{

  constructor(props) {
    super(props);
    this.state = {
        file: null,
        markers: [],
        form: {         
          conditions: '',
          img: '',
          markerid: '',
          total_tickets: '',
          used_tickets: 0,
          date_expire: 'YYYY-MM-DD'
        }
      };

    axios.get('/markerprofile')
      .then(response => this.setState({markers: response.data}));

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {

      e.persist();
      let store = this.state;
      store.form[e.target.name] = e.target.value;
      this.setState(store);   
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
      var idImages = [];
      for(var x=0; x<response.data.file.length; x++){
        idImages.push(response.data.file[x]);
      }
      // this.state.form.img = idImages[0];

      let storeImg = this.state;
      storeImg.form['img'] = idImages[0];
      this.setState(storeImg);               

      this.rowSave().then((responseFinal)=>{
        // console.log(responseFinal.data);
        if(responseFinal.data.error!=null){
          // for(var y=0; y<this.state.form.images.length; y++){
          this.deleteImages(this.state.form.img).then((responseImageFinal)=>{
              console.log(responseImageFinal);
            })            
          // }
        }
        // alert(JSON.stringify(responseFinal.data));
        alert("Data stored correctly!!!");


      })

    })
  }
  onChange(e) {
    this.setState({file:e.target.files})
  }

  fileUpload(file){
  	console.log(file);
    const url = '/upload';
    const formData = new FormData();
    for(var x = 0; x<file.length; x++) {
        formData.append('file',file[x])
    }
    
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  axios.post(url, formData,config)
    
  }
  
  rowSave(){
      const url = '/dealsprofile';
      const config = {
          headers: {
              'content-type': 'application/json'
          }
      }
      return axios.post(url, this.state.form, config);
  }

  deleteImages(idImage){
      const url = '/images/delete/'+idImage;
      return axios.delete(url);
  }  


  render() {
    const { form } = this.state;
    return (
      <form onSubmit={this.onFormSubmit}>
          <label>Store</label>
          <select name="markerid" value={form.markerid} onChange={this.handleChange} required>
            <option value="Select..">Select..</option>
            {(this.state.markers || []).map(item => (
                <option key={item.title} value={item._id}>{item.title}</option>
              ))}
          </select>
          <br/>
          <br/>      
          <label>Conditions</label>
          <input name="conditions" value={form.conditions} type="text" onChange={this.handleChange} required/>       
          <br/>
          <br/>
          <label>Image Deal </label>
          <input type="file" onChange={this.onChange} multiple required/>
          <br/>
          <br/>
          <label>Total tickets</label>
          <input name="total_tickets" value={form.total_tickets} type="number" onChange={this.handleChange} required/>       
          <br/>
          <br/>
          <label>Date Expire</label>
          <input name="date_expire" value={form.date_expire} type="text" onChange={this.handleChange} required/>       
          <br/>
          <br/>
          <button type="submit">Save</button>

      </form>
   )
  }              
}

// ReactDOM.render(<DealsApp />, document.getElementById('root'))
export default DealsApp