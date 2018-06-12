import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import movieService from './services/movieService';
import MovieList from './components/movieList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieService,
      movieList: {
        results: []
      },
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
    try {
      await movieService.getConfiguration();
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          apiReady: movieService.ready,
        } 
      })
    } catch(error) {
      console.error(new Error(error));
    }
  }

  async getMovieNowPlaying() {
    try {
      const movieList = await movieService.getMovieNowPlaying();
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          movieList,
          apiReady: movieService.ready,
        } 
      })
    } catch(error) {
      console.error(new Error(error));
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Movie DB</h1>
        </header>
        <div className="App-intro">
          {this.state.apiReady ? 
            <React.Fragment>
              <h1>In Theater</h1>
              <MovieList movieList={this.state.movieList.results} />
            </React.Fragment> 
            : 
            <React.Fragment>
              <br/>
              <br/>
              Couldn't reach the API to get the configuration.
              <br/>
              Error dump: {JSON.stringify(this.state.movieService.latestResponse)}
              <br/>
              <button onClick={this.getMovieServiceConfiguration}>Retry</button>
            </React.Fragment>}
        </div>
      </div>
    );
  }
}

export default App;
