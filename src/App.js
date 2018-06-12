import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import movieService from './services/movie-api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieService,
      apiReady: false
    }

    // bindings
    this.getMovieServiceConfiguration = this.getMovieServiceConfiguration.bind(this);

    // init
    this.getMovieServiceConfiguration();
  }

  getMovieServiceConfiguration() {
    movieService.getConfiguration().then(() => {
      console.log('config fetched');
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          apiReady: movieService.ready
        } 
      })
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Movie DB</h1>
        </header>
        <p className="App-intro">
          Is api ready? {this.state.apiReady ? 'yes' : 'no'}
          {this.state.apiReady ? 
            <React.Fragment>
              <br/>
              <br/>
              API configuration dump:
              <br/>
              {JSON.stringify(this.state.movieService.configuration)}
            </React.Fragment> 
            : 
            <React.Fragment>
              <br/>
              <br/>
              Couldn't reach the API to get the configuration:
              <br/>
              <button onClick={this.getMovieServiceConfiguration}>Refresh</button>
            </React.Fragment>}
        </p>
      </div>
    );
  }
}

export default App;
