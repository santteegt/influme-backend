import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';

class Editbusiness extends Component {

  constructor(props) {
    super(props);
    this.state = {
        imgNames: [],
        img: [],
        file: [],
        types_business: [],
        form: {
          _id: '',         
          title: '',
          shortdescription: '',
          images: [],
          type: {
            _id: '',
            description: '',
            icontype: '',
            iconimg: ''
          },
          lat: '',
          lon: '',
          followers: 0,          
          web: '',
          address: '',
          facebookid: '',
          instagramid: ''
        }
      };
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleChange = this.handleChange.bind(this); 


  }

  componentDidMount(){

    const { title } = this.props.match.params;

    axios.get('/typemarker')
      .then(response => this.setState({types_business: response.data}));

    axios.get('/markerprofile/search/' + title)
      .then(response => 
        {

          let arrayImages = [];          
          response.data[0].images.map(item => 
          {
            axios.get('/image/'+ item).then(responseimg => 
            {

                // alert("Image: "+responseimg.data.imagesource);
                // var imageStr = this.arrayBufferToBase64(responseimg.data.imagesource);
                var blob = this.base64ToBlob(responseimg.data.imagesource, responseimg.data.type);
                var blobUrl = URL.createObjectURL(blob);
                
                let elementImages = {"source": blobUrl, "filename": responseimg.data.filename}
                // arrayImages.push('data:image/jpeg;base64,'+responseimg.data.imagesource);
                arrayImages.push(elementImages);


                this.setState({
                    img: arrayImages
                });         

                // this.setState({
                //     img: 'data:image/jpeg;base64,'+responseimg.data.imagesource
                // })
            })
          })
          console.log("---- " + response.data[0].type.description);
          this.setState({form: response.data[0]})
        }

      );      

  }  


  base64ToBlob(b64Data, contentType, sliceSize){

    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
      
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;

  }


  onFormSubmit(e){
    e.preventDefault() // Stop form submit


    if(this.state.file.length === 0){

      this.requestToUpdate(false);

    }else{

                this.fileUpload(this.state.file).then((response)=>{
                  console.log("Response save Image: " + JSON.stringify(response.data));
                  
                  // Set new images
                  var idImages = this.state.form.images;
                  for(var x=0; x<this.state.imgNames.length; x++){
                    let index = idImages.indexOf(this.state.imgNames[x].original);
                    // let index = idImages.findIndex(x => x === this.state.imgNames[x].original);
                    idImages[index] = this.state.imgNames[x].nuevo;
                  }

                  console.log("Imagenes nuevas a grabar " + JSON.stringify(idImages));

                  // for(var x=0; x<response.data.file.length; x++){
                  //   idImages.push(response.data.file[x]);
                  // }

                  let storeImg = this.state;
                  storeImg.form['images'] = idImages;
                  this.setState(storeImg);  

                  this.requestToUpdate(true);       
      

                })
        }
  }

  requestToUpdate(flagImageUpload){  

        this.rowSave(this.state.form._id).then((responseFinal)=>{

          console.log(responseFinal.data);

        })
          .catch( error => {

              if (error.response) {
                console.log(error.response.status);
                if(flagImageUpload === true){
                  for(var y=0; y<this.state.imgNames.length; y++){
                    this.catchDeleteImage(this.state.imgNames[y].nuevo).then((responseImageFinal)=>{
                      console.log("Delete Images: " + responseImageFinal);
                    })            
                  }              
                }

              }else if (error.request) {            
                console.log(error.request);
                if(flagImageUpload === true){                
                  for(var z=0; z<this.state.imgNames.length; z++){
                    this.catchDeleteImage(this.state.imgNames[z].nuevo).then((responseImageFinal)=>{
                      console.log("Delete Images: " + responseImageFinal);
                    })            
                  }
                }

              } else {                
                console.log('Error', error.message);
                if(flagImageUpload === true){                
                  for(var w=0; w<this.state.imgNames.length; w++){
                    this.catchDeleteImage(this.state.imgNames[w].nuevo).then((responseImageFinal)=>{
                      console.log("Delete Images: " + responseImageFinal);
                    })            
                  }
                }
              }

          });

  }
  onChange(e) {

    // console.log(e);

    // console.log(JSON.stringify(e.target.id));

    let arrayNameImagesReplaced = this.state.imgNames;

    let elementModify={
      "original": e.target.id,
      "nuevo": e.target.files[0].name       
    }

    arrayNameImagesReplaced.push(elementModify);

    this.setState({imgNames: arrayNameImagesReplaced})  

    console.log("arrayNameImagesReplaced "+JSON.stringify(this.state.imgNames[0].original));

    let arrayFiles = this.state.file;
    arrayFiles.push(e.target.files[0]);


    this.setState({file:arrayFiles})

  }


  fileUpload(file){
    console.log("a grabar "+file);
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
  rowSave(idBusiness){
      const url = '/markerprofile/update/'+idBusiness;
      const config = {
          headers: {
              'content-type': 'application/json'
          }
      }
      return axios.put(url, this.state.form, config);
  }

  deleteImages(idImage){
      const url = '/images/delete/'+idImage;
      return axios.delete(url);
  }  

  catchDeleteImage(nameImg){
    return this.deleteImages(nameImg).then((responseImageFinal)=>{
        console.log("rollback image!!!");            
    });
  }

  handleChange(e) {

      e.persist();
      let store = this.state;
      console.log("Nombre Campo "+ e.target.name);
      store.form[e.target.name] = e.target.value;
      this.setState(store);   
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
                                <select name="type" className="form-control" value={form.type._id} onChange={this.handleChange} required>
                                    {(this.state.types_business || []).map(item => (
                                        <option key={item._id} value={item._id}>{item.description}</option>
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
                                <label>Facebook Link</label>
                                <input name="facebookid" value={form.facebookid} type="text" className="form-control"  placeholder="Enter facebook Link" onChange={this.handleChange} required/>

                            </div>
                            <div className="form-group">
                                <label>Instagram Link</label>
                                <input name="instagramid" value={form.instagramid} type="text" className="form-control"  placeholder="Enter instagram Link" onChange={this.handleChange} required/>

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

                            <label>Upload images</label>                               

                              {(this.state.img || []).map(itemImg => (
                                <div key={itemImg.filename}className="form-group">
                                <img src={itemImg.source} height="100" width="100" alt='Helpful alt text'/>                                
                                <br/>
                                <input id={itemImg.filename} type="file" onChange={this.onChange}/>
                                </div>
                              ))}

                            
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
export default Editbusiness;