import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';

class NewDeal extends Component {

  constructor(props) {
    super(props);
    this.state = {
        file: null,
        markers: [],
        form: {      
          title: '',   
          conditions: '',
          hotdeal: '',
          img: '',
          markerid: '',
          total_tickets: '',
          used_tickets: 0,
          date_expire: ''
        }
      };    

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleChange = this.handleChange.bind(this);    

  }

  componentDidMount(){

    const { businessid } = this.props.match.params;

    let idmarker = this.state;
    idmarker.form['markerid'] = businessid
    this.setState(idmarker);
  
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
    * 1. Grabar imagen en Mongo
    *
    */
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
      * 1. Grabar imagen en Mongo
      *
      */
      this.rowSave().then((responseFinal)=>{

          console.log(responseFinal);
          this.generateCodeqr(responseFinal.data._id, responseFinal.data.total_tickets, responseFinal.data.img);

        })
        .catch( error => {

            if (error.response) {
              console.log(error.response.status);
              this.catchDeleteImage(this.state.form.img).then((responseImageFinal)=>{
                  console.log("Delete image: " + responseImageFinal);
              });          
              // Respaldo borrar          
              // this.deleteImages(this.state.form.img).then((responseImageFinal)=>{
              //     console.log(responseImageFinal);
              //   })            
            }else if (error.request) {            
              console.log(error.request);
              this.catchDeleteImage(this.state.form.img).then((responseImageFinal)=>{
                  console.log("Delete image: " + responseImageFinal);
              });
              // Respaldo borrar
              // this.deleteImages(this.state.form.img).then((responseImageFinal)=>{
              //     console.log(responseImageFinal);
              //   })            

            } else {                
              console.log('Error', error.message);
              this.catchDeleteImage(this.state.form.img).then((responseImageFinal)=>{
                  console.log("Delete image: " + responseImageFinal);
              });
              // Respaldo borrar
              // this.deleteImages(this.state.form.img).then((responseImageFinal)=>{
              //     console.log(responseImageFinal);
              //   })            

            }

        });        
        
      // })

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

  generateCodeqr(idDeal, numTickets, nameImg){

    let codesqrSave = []

    
    for(var i=0;i<numTickets;i++){

        let bodyDeals = {
          codeqr: idDeal + "_" + i,
          dealid: idDeal,
          isused: false
        }

        this.dealsqrSave(bodyDeals).then( responseFinal => {

          console.log(responseFinal);
          codesqrSave.push(responseFinal.data._id);

        })
        .catch( error => {

            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */          

            if (error.response) {

                console.log("error.response saveDealqr: "+error.response.status);

                this.allRollback(nameImg,codesqrSave, idDeal);
                
                // this.deleteImages(nameImg).then((responseImageFinal)=>{
                    
                //     console.log("rollback images: "+responseImageFinal);
                    
                //     if(codesqrSave.length>0){
                //         for(var y=0; y<codesqrSave.length; y++)
                //         {
                //             this.deleteDealcode(codesqrSave[y]).then((responseDeleteqr)=>{
                //                 console.log("rollback codeqr!!!");

                //                 this.deleteDeal(idDeal).then((responseDeleteDeal)=>{
                //                   console.log("rollback deal!!!");

                //                 });


                //             });                            
                //         }
                //     }else{
                //         this.deleteDeal(idDeal).then((responseDeleteDeal)=>{
                //           console.log("rollback deal!!!");

                //         });                      
                //     } 
                                   
                // })  

            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */                               
                  
            }else if (error.request) {            
                console.log("error.request saveDealqr: "+error.request);

                this.allRollback(nameImg,codesqrSave, idDeal);
                // this.deleteImages(nameImg).then((responseImageFinal)=>{
                //     console.log(responseImageFinal);
                //     for(var y=0; y<codesqrSave.length; y++)
                //     {
                //         this.deleteDealcode(codesqrSave[y]).then((responseDeleteqr)=>{
                //             console.log("rollback codeqr!!!");
                //             this.deleteDeal(idDeal).then((responseDeleteDeal)=>{
                //               console.log("rollback deal!!!");

                //             });                            
                //         });                            
                //     }                    
                //   })    
                
            // Something happened in setting up the request and triggered an Error                 
            } else {                
                console.log("else saveDealqr: "+ error.message);

                this.allRollback(nameImg,codesqrSave, idDeal);

                // this.deleteImages(nameImg).then((responseImageFinal)=>{
                //     console.log(responseImageFinal);
                //     for(var y=0; y<codesqrSave.length; y++)
                //     {
                //         this.deleteDealcode(codesqrSave[y]).then((responseDeleteqr)=>{
                //             console.log("rollback codeqr!!!");
                //             this.deleteDeal(idDeal).then((responseDeleteDeal)=>{
                //               console.log("rollback deal!!!");

                //             });                            
                //         });                            
                //     }                    
                //   })    
                  
            }

            return;   

        });
    }

  }

  dealsqrSave(bodyDeals){
      const url = '/dealsqrcode/save';
      const config = {
          headers: {
              'content-type': 'application/json'
          }
      }

      return axios.post(url, bodyDeals, config);
  }  

  deleteImages(idImage){
      const url = '/images/delete/'+idImage;
      return axios.delete(url);
  }

  deleteDealcode(idQr){
      const url = '/dealsqrcode/delete/'+idQr;
      return axios.delete(url);
  }

  deleteDeal(idDeal){
      const url = '/dealsprofile/delete/'+idDeal;
      return axios.delete(url);
  }    

  catchDeleteImage(nameImg){
    return this.deleteImages(nameImg).then((responseImageFinal)=>{
        console.log("rollback image!!!");            
    });
  }  

  catchDeleteDealscode(codesqrSave){

    return this.deleteDealcode(codesqrSave).then((responseDeleteqr)=>{
        console.log("rollback codeqr!!!");
    });

  }

  catchDeleteDeal(idDeal){

    return this.deleteDeal(idDeal).then((responseDeleteDeal)=>{
        console.log("rollback deal!!!");
    });
  }

  allRollback(nameImg,codesqrSave, idDeal){

    this.catchDeleteImage(nameImg).then((responseImageFinal)=>{

        console.log("Delete image: " + responseImageFinal);

        for(var y=0; y<codesqrSave.length; y++)
        {
            this.catchDeleteDealscode(codesqrSave[y]);
        }

        this.catchDeleteDeal(idDeal);

    });

  }


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
                            <h4>New Deal</h4>
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
                                <input name="total_tickets" value={form.total_tickets} type="number" className="form-control" placeholder="Enter total of tickets" onChange={this.handleChange} required/>

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
export default NewDeal;