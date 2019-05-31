class Home extends React.Component {
    render() {
        return (
            <div>
                <p>Please choose a option from the list below.</p>
                <ul>
                    <li><a href="/admin">Create Store</a></li>
                    <li><a href="/deals">Create Deals</a></li>                    
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById('root'))