import React, { Component } from 'react';
import './App.css';

import movieService from './services/movieService';
import Pagination from './components/pagination';
import MovieList from './components/movieList';
import MovieDetailsContext from './contexts/movieDetailsContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieService,
      movieList: {
        results: []
      },
      movieDetails: {},
      apiReady: false
    }

    // bindings
    this.getMovieServiceConfiguration = this.getMovieServiceConfiguration.bind(this);
    this.getMovieNowPlaying = this.getMovieNowPlaying.bind(this);
    this.getMovieDetails = this.getMovieDetails.bind(this);
    this.deleteMovieDetails = this.deleteMovieDetails.bind(this);
  }

  componentWillMount() {
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
          movieList
        } 
      })
    } catch(error) {
      console.error(new Error(error));
    }
  }

  async getMovieDetails(id) {
    try {
      const movieDetails = await movieService.getMovieDetails(id);
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          movieDetails
        } 
      })
    } catch(error) {
      console.error(new Error(error));
    }
  }

  deleteMovieDetails() {
    this.setState((prevState, props) => {
      return { 
        ...prevState,
        movieDetails: {}
      } 
    })
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Welcome to Movie DB</h1>
        </header>
        <div>
          {this.state.apiReady ? 
            <React.Fragment>
              <h2>In Theater</h2>
              <Pagination/>
              <MovieDetailsContext.Provider value={{ movieDetails: this.state.movieDetails, getMovieDetails: this.getMovieDetails, deleteMovieDetails: this.deleteMovieDetails }}>
                <MovieList movieList={this.state.movieList.results} />
              </MovieDetailsContext.Provider>
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
