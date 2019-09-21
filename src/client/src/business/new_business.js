import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';

class Newbusiness extends Component {

  constructor(props) {
    super(props);
    this.state = {
        file: null,
        types_business: [],
        form: {         
          title: '',
          shortdescription: '',
          images: [],
          type: '',
          lat: '',
          lon: '',
          followers: 0,          
          web: '',
          address: '',
          facebookurl: '',
          facebookid: '',
          instagramid: ''
        }
      };
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleChange = this.handleChange.bind(this); 
    // this.handleClick = this.handleClick.bind(this);     

  }

  componentDidMount(){
    axios.get('/typemarker')
      .then(response => this.setState({types_business: response.data}));
  }  


  // handleClick(userId, idClick) {

  //     this.getFaceId(this.state.form.facebookurl).then((responseFinal)=>{

  //       console.log(responseFinal);

  //     })
  //       .catch( error => {

  //           if (error.response) {
  //             console.log(error.response.status);

  //           }else if (error.request) {            
  //             console.log(error.request);

  //           } else {                
  //             console.log('Error', error.message);

  //           }

  //       });

  // }

  // getFaceId(faceName){

  //     const url = 'https://findmyfbid.com';
  //     let bodyIdFace = {"url": faceName}
  //     const config = {
  //         headers: {
  //             'content-type': 'application/json'
  //         }
  //     }

  //     console.log("BODY : " +JSON.stringify(bodyIdFace));
  //     return axios.post(url, bodyIdFace, config);

  // }


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
        // if(responseFinal.data.error!=null){
        // for(var y=0; y<this.state.form.images.length; y++){
        //   this.deleteImages(this.state.form.images[y]).then((responseImageFinal)=>{
        //     console.log("Response Final: " + responseImageFinal);
        //   })            
        // }
        // }
        // alert(JSON.stringify(responseFinal.data));
        console.log(responseFinal);
        // alert("Data stored correctly!!!");


      })
        .catch( error => {

            if (error.response) {
              console.log(error.response.status);
              for(var y=0; y<this.state.form.images.length; y++){
                this.catchDeleteImage(this.state.form.images[y]).then((responseImageFinal)=>{
                  console.log("Delete Images: " + responseImageFinal);
                })            
              }              

            }else if (error.request) {            
              console.log(error.request);
              for(var z=0; z<this.state.form.images.length; z++){
                this.catchDeleteImage(this.state.form.images[z]).then((responseImageFinal)=>{
                  console.log("Delete Images: " + responseImageFinal);
                })            
              }

            } else {                
              console.log('Error', error.message);
              for(var w=0; w<this.state.form.images.length; w++){
                this.catchDeleteImage(this.state.form.images[w]).then((responseImageFinal)=>{
                  console.log("Delete Images: " + responseImageFinal);
                })            
              }

            }

        });      

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

  handleChange(e) {

      e.persist();
      let store = this.state;
      store.form[e.target.name] = e.target.value;
      this.setState(store);   
  }

  catchDeleteImage(nameImg){
    return this.deleteImages(nameImg).then((responseImageFinal)=>{
        console.log("rollback image!!!");            
    });
  }


  render() {
    const { form } = this.state;
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar></Topbar>
                <div className="container-fluid">
                    <h1 className="h3 mb-2 text-gray-800">Business</h1>
                    <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the official DataTables documentation.</p>

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h4>New Business</h4>
                        </div>
                        <div className="card-body">
                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input name="title" type="text" value={form.title} className="form-control" onChange={this.handleChange} placeholder="Enter business name" required/>
                            </div>
                            <div className="form-group">
                                <label>Business Type</label>
                                <select name="type" className="form-control" value={form.type} onChange={this.handleChange} required>
                                    <option value="Select..">Select..</option>
                                    {(this.state.types_business || []).map(item => (
                                        <option key={item.description} value={item._id}>{item.description}</option>
                                      ))}
                                </select>                                
                                
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input name="address" value={form.address} type="text" className="form-control" placeholder="Enter address" onChange={this.handleChange} required/>

                            </div>
                            <div className="form-group">
                                <label>Website</label>
                                <input name="web" value={form.web} type="text" className="form-control" placeholder="Enter Website" onChange={this.handleChange} required/>

                            </div>
                            <div className="form-group">
                                <label>Facebook Id</label>
                                <input name="facebookid" value={form.facebookid} type="text" className="form-control" placeholder="Enter facebook user" onChange={this.handleChange} required/>

                            </div>                            
                            <div className="form-group">
                                <label>Instagram Link</label>
                                <input name="instagramid" value={form.instagramid} type="text" className="form-control"  placeholder="Enter instagram user" onChange={this.handleChange} required/>

                            </div>
                            <div className="form-group">
                                <label>Business Description</label>
                                <input name="shortdescription" value={form.shortdescription} type="text" className="form-control" placeholder="Enter business description" onChange={this.handleChange} required/>

                            </div>
                            <div className="form-group">
                                <label>Latitude</label>
                                <input name="lat" value={form.lat} type="number" className="form-control" placeholder="Enter latitude" onChange={this.handleChange} required/>

                            </div>
                            <div className="form-group">
                                <label>Longitude</label>
                                <input name="lon" value={form.lon} type="number" className="form-control" placeholder="Enter longitude" onChange={this.handleChange} required/>

                            </div>       

                            <label>Upload images (maximum 3 images)</label>
                            <div className="form-group">                            
                                
                                <input type="file" onChange={this.onChange} multiple required/>

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
export default Newbusiness;