import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Film from './FilmSave/Film'

class App extends Component {
  divStyle = {
    width: '100%',
     borderWidth: '10px',
     borderStyle: 'ridge',
     borderRadius: '20px'
  };
  
  /*state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.error(err));
  }

  callApi = async () => {
    const response = await fetch('http://localhost:5000/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };*/

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Films</h1>
        </header>
        <div style={this.divStyle}>
          <Film></Film>
        </div>
      </div>
    );
  }
}

export default App;
