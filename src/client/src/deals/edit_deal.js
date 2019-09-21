import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';

class EditDeal extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	img: '',
        file: null,
        markers: [],
        form: {         
          _id: '',
          title: '',
          conditions: '',
          hotdeal: '',
          img: '',
          markerid: '',
          total_tickets: '',
          used_tickets: 0,
          date_expire: Date
        }
      };    

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleChange = this.handleChange.bind(this);    

  }

  componentDidMount(){

    const { businessid, pdealid} = this.props.match.params;

    console.log("businessid: " + businessid);
    console.log("pdealid: " + pdealid);

    let idMarker = this.state;
    idMarker.form['markerid'] = businessid;
    this.setState(idMarker);

    axios.get('/dealsprofile/onedeal/' + pdealid)
      .then(response => {            

            axios.get('/image/'+ response.data.img).then(responseimg => 
            {              

                var blob = this.base64ToBlob(responseimg.data.imagesource, responseimg.data.type);
                var blobUrl = URL.createObjectURL(blob);        

                // var dataUrl = 'data:' + contentType + ';base64,' + responseimg.data.imagesource;                
                
                // console.log("Blob : " + blobUrl);      
                this.setState({
                    img: blobUrl,
                    file: blobUrl
                    // file: 'data:'+responseimg.data.type+';base64,'+responseimg.data.imagesource
                });                                             
            })
      		// formato fecha
      		var res = response.data.date_expire.split("T");
      		response.data.date_expire = res[0];

			this.setState({form: response.data})

      });
  
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

  handleChange(e) {

      e.persist();
      let store = this.state;
      store.form[e.target.name] = e.target.value;
      this.setState(store);   
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit

    /* 
    * 
    * 1. Grabar imagen en Mongo. Verifica si va ser actualizada la imagen caso contrario no toma accion
    *
    */

    if(this.state.file === null){
      
      this.requestToUpdate(false);

    }else
    {

        this.fileUpload(this.state.file).then((response)=>{
          console.log(response.data);
          var idImages = [];
          for(var x=0; x<response.data.file.length; x++){
            idImages.push(response.data.file[x]);
          }

          let storeImg = this.state;
          storeImg.form['img'] = idImages[0];
          this.setState(storeImg);               

          /* 
          * 
          * 1. Grabar registro de deal
          *
          */

          this.requestToUpdate(true);

        })
    }
  }

  requestToUpdate(flagImageUpload){

         /* 
          * 
          * 1. Grabar registro de deal
          *
          */
          this.rowUpdate(this.state.form._id).then((responseFinal)=>{

              console.log(responseFinal);
              

            })
            .catch( error => {

                if (error.response) {
                  console.log(error.response.status);
                  if(flagImageUpload === true){
                      this.catchDeleteImage(this.state.form.img).then((responseImageFinal)=>{
                          console.log("Delete image: " + responseImageFinal);
                      });          
                  }
                  // Respaldo borrar          
                  // this.deleteImages(this.state.form.img).then((responseImageFinal)=>{
                  //     console.log(responseImageFinal);
                  //   })            
                }else if (error.request) {            
                  console.log(error.request);
                  if(flagImageUpload === true){
                      this.catchDeleteImage(this.state.form.img).then((responseImageFinal)=>{
                          console.log("Delete image: " + responseImageFinal);
                      });
                  }
                  // Respaldo borrar
                  // this.deleteImages(this.state.form.img).then((responseImageFinal)=>{
                  //     console.log(responseImageFinal);
                  //   })            

                } else {                
                  console.log('Error', error.message);
                  if(flagImageUpload === true){
                    this.catchDeleteImage(this.state.form.img).then((responseImageFinal)=>{
                        console.log("Delete image: " + responseImageFinal);
                    });
                  }
                  // Respaldo borrar
                  // this.deleteImages(this.state.form.img).then((responseImageFinal)=>{
                  //     console.log(responseImageFinal);
                  //   })            

                }

            });

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
  
  rowUpdate(idDeal){
      const url = '/dealsprofile/update/'+idDeal;
      const config = {
          headers: {
              'content-type': 'application/json'
          }
      }
      console.log("body: " + JSON.stringify(this.state.form));
      return axios.put(url, this.state.form, config);
  }  

  deleteImages(idImage){
      const url = '/images/delete/'+idImage;
      return axios.delete(url);
  }

  // deleteDeal(idDeal){
  //     const url = '/dealsprofile/delete/'+idDeal;
  //     return axios.delete(url);
  // }    

  catchDeleteImage(nameImg){
    return this.deleteImages(nameImg).then((responseImageFinal)=>{
        console.log("rollback image!!!");            
    });
  }  

  // catchDeleteDeal(idDeal){

  //   return this.deleteDeal(idDeal).then((responseDeleteDeal)=>{
  //       console.log("rollback deal!!!");
  //   });
  // }

  // allRollback(nameImg,codesqrSave, idDeal){

  //   this.catchDeleteImage(nameImg).then((responseImageFinal)=>{

  //       console.log("Delete image: " + responseImageFinal);

  //       this.catchDeleteDeal(idDeal);

  //   });

  // }  


  render() {
    const { form } = this.state;
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar></Topbar>
                <div className="container-fluid">
                    <h1 className="h3 mb-2 text-gray-800">Deals</h1>
                    <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the official DataTables documentation.</p>

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h4>Edit Deal</h4>
                        </div>
                        <div className="card-body">
                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input name="title" type="text" value={form.title} className="form-control" onChange={this.handleChange} placeholder="Enter title" required/>
                                
                            </div>

                            <div className="form-group">
                                <label>Condition</label>
                                <input name="conditions" type="text" value={form.conditions} className="form-control" onChange={this.handleChange} placeholder="Enter conditions" required/>
                                
                            </div>
                            <div className="form-group">
                                <label>Total tickets</label>
                                <input name="total_tickets" value={form.total_tickets} type="number" className="form-control" placeholder="Enter total of tickets" onChange={this.handleChange} readOnly required/>

                            </div>
                            <div className="form-group">
                                <label>Expiration date</label>
                                <input name="date_expire" value={form.date_expire} type="date" className="form-control" placeholder="Enter expiration date" onChange={this.handleChange} required/>

                            </div>     

                            <div className="form-group">
                              <label>Is Hot Deal?</label>
                              <div className="form-group">
                                <input name="hotdeal" type="radio" value="Yes" checked={form.hotdeal === 'Yes'} onChange={this.handleChange} required/>Yes                                                          
                                <input name="hotdeal" type="radio" value="No" checked={form.hotdeal === 'No'} onChange={this.handleChange} required/>No                           
                              </div>                                
                            </div>

                            <label>Upload image</label>

                              <div className="form-group">                            
  	                                <img src={this.state.img} height="100" width="180" alt='Helpful alt text'/>                                
                              </div>
                              <div className="form-group">                            
                                    <input type="file" onChange={this.onChange}/>
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
export default EditDeal;