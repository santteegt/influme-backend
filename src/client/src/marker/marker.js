import React, { Component } from 'react';
import axios from 'axios';



class Marker extends Component {

  constructor(props) {
    super(props);
    // this.state ={
    //   file:null
    // }
    this.state = {
        file: null,
        typesm: [],
        form: {         
          title: '',
          shortdescription: '',
          images: [],
          type: '',
          lat: '',
          lon: '',
          followers: 0,          
          web: '',
          address: ''
        }
      };

    axios.get('/typemarker')
      .then(response => this.setState({typesm: response.data}));

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
      console.log("Response: " + JSON.stringify(response.data));
      var idImages = [];
      for(var x=0; x<response.data.file.length; x++){
        idImages.push(response.data.file[x]);
      }
      // this.state.form.images = idImages;
      // this.setState({this.state.form.images = idImages}});

      let storeImg = this.state;
      storeImg.form['images'] = idImages;
      this.setState(storeImg);         

      this.rowSave().then((responseFinal)=>{
        // console.log(responseFinal.data);
        if(responseFinal.data.error!=null){
          for(var y=0; y<this.state.form.images.length; y++){
            this.deleteImages(this.state.form.images[y]).then((responseImageFinal)=>{
              console.log("Response Final: " + responseImageFinal);
            })            
          }
        }
        // alert(JSON.stringify(responseFinal.data));
        alert("Data stored correctly!!!");


      })

    })
  }
  onChange(e) {
    // let file = e.target.files[0]
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload=(e)=>{
    //   this.setState({file:e.target.result});
    //   // console.warn("image data " + e.target.result);

    // }

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
      const url = '/markerprofile';
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
          <label>Store name</label>
          <input name="title" value={form.namestore} type="text" onChange={this.handleChange} required/>       
          <br/>
          <br/>
          <label>Short description</label>
          <input name="shortdescription" value={form.shortdescription} type="text" onChange={this.handleChange} required/>       
          <br/>
          <br/>             
          <label>Store type</label>
          <select name="type" value={form.type} onChange={this.handleChange} required>
            <option value="Select..">Select..</option>
            {(this.state.typesm || []).map(item => (
                <option key={item.description} value={item._id}>{item.description}</option>
              ))}
          </select>
          <br/>
          <br/>      
          <label>Store images </label>
          <input type="file" onChange={this.onChange} multiple required/>
          <br/>
          <br/>
          <label>Latitude</label>
              <input name="lat" value={form.lat} type="number" onChange={this.handleChange} required/>       
              <br/>
              <br/>
          <label>Longitude</label>
              <input name="lon" value={form.lon} type="number" onChange={this.handleChange} required/>       
              <br/>
              <br/>
          <label>Web Page</label>
              <input name="web" value={form.web} type="text" onChange={this.handleChange} required/>       
              <br/>
              <br/>
          <label>Adderss</label>
              <input name="address" value={form.address} type="text" onChange={this.handleChange} required/>       
              <br/>
              <br/>          

          <button type="submit">Save</button>

      </form>
   )
  }              
}

// ReactDOM.render(<Marker />, document.getElementById('root'))
export default Marker;
