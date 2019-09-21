import React, { Component } from 'react';
import Topbar from '../topbar/topbar';
import Footer from '../footer/footer';
import axios from 'axios';
import QRCode from 'qrcode.react';
import Pdf from "react-to-pdf";

const ref = React.createRef();

class Printqr extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	codeqrinfo: [],
	}
  }

  componentDidMount(){

    const { idqr } = this.props.match.params;

    axios.get('/dealsqrcode/search/one/' + idqr)
      .then(response => {      	
			this.setState({codeqrinfo: response.data[0]})
      });    
  }



  render() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar></Topbar>

					<div className="container-fluid">

			          
			          <h1 className="h3 mb-2 text-gray-800">Print CodeQR</h1>
			          
			          <div className="card shadow mb-4">
			            <div className="card-header py-3">			            


						      <Pdf targetRef={ref} filename="code-qr.pdf">
						        {({ toPdf }) => <button onClick={toPdf}>Generate PDF</button>}
						      </Pdf>

                            <div ref={ref} className="form-group" align="center">

								<QRCode

								          value={`${this.state.codeqrinfo.codeqr}`}
								/>                               
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
export default Printqr;