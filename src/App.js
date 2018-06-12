import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import movieService from './services/movieService';

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
    this.getMovieServiceConfiguration().then(() => {
      this.getMovieNowPlaying();
    });
  }

  async getMovieServiceConfiguration() {

    await movieService.getConfiguration();
    this.setState((prevState, props) => {
      return { 
        ...prevState,
        apiReady: movieService.ready,
      } 
    })
  }

  async getMovieNowPlaying() {

    const movieList = await movieService.getMovieNowPlaying();
    this.setState((prevState, props) => {
      return { 
        ...prevState,
        movieList,
        apiReady: movieService.ready,
      } 
    })
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
              <br/>
              movie now playing list dump:
              <br/>
              {JSON.stringify(this.state.movieList)}
            </React.Fragment> 
            : 
            <React.Fragment>
              <br/>
              <br/>
              Couldn't reach the API to get the configuration:
              <br/>
              {JSON.stringify(this.state.movieService.latestResponse)}
              <br/>
              <button onClick={this.getMovieServiceConfiguration}>Retry</button>
            </React.Fragment>}
        </p>
      </div>
    );
  }
}

export default App;
