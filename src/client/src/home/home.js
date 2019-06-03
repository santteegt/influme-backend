import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div>
                <p>Please choose a option from the list below.</p>
                <ul>
                    <li><a href="/marker">Create Store</a></li>
                </ul>
            </div>
        );
    }
}

// ReactDOM.render(<Home />, document.getElementById('root'))
export default Home
