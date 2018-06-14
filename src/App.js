import React, { Component } from 'react';
import './App.css';

import {ProgressBar, Button} from 'react-materialize';

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
      apiReady: false,
      apiError: false
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
          apiError: false
        } 
      })
    } catch(error) {
      console.error(new Error(error));
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          apiError: true
        } 
      })
    }
  }

  async getMovieNowPlaying() {
    try {
      const movieList = await movieService.getMovieNowPlaying();
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          movieList,
          apiError: false
        } 
      })
    } catch(error) {
      console.error(new Error(error));
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          apiError: true
        } 
      })
    }
  }

  async getMovieDetails(id) {
    try {
      const movieDetails = await movieService.getMovieDetails(id);
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          movieDetails,
          apiError: false
        } 
      })
    } catch(error) {
      console.error(new Error(error));
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          apiError: true
        } 
      })
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
          <h1>Movies in theater</h1>
        </header>
        <div>
          {this.state.apiReady ? 
            <React.Fragment>
              <Pagination/>
              <MovieDetailsContext.Provider value={{ movieDetails: this.state.movieDetails, getMovieDetails: this.getMovieDetails, deleteMovieDetails: this.deleteMovieDetails }}>
                <MovieList movieList={this.state.movieList.results} />
              </MovieDetailsContext.Provider>
            </React.Fragment> 
            : this.state.apiError ?
              <div className="card horizontal">
                <div className="card-content">
                <p>
                  <b>Couldn't reach the API to get the configuration.</b>
                </p>
                <br />
                <p>
                  Error dump:
                  <br />
                  {JSON.stringify(this.state.movieService.latestResponse)}
                </p>
                <br />
                <Button onClick={this.getMovieServiceConfiguration}>Retry</Button>
                </div>
              </div>
              :
              <ProgressBar />
            }
        </div>
      </div>
    );
  }
}

export default App;
