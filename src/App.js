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
      movieListPagination: {
				previous: 0,
				list: [0],
				next: 0,
				current: 0,
				total: 1
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

  paginationDataBuilder(dataList) {
    const pagePrevious = (dataList.page - 1) > 0 ? dataList.page - 1 : null;
    const pageNext = (dataList.page + 1) < dataList.total_pages ? dataList.page + 1 : null;
    
    let pageList = [];
    if(dataList.page - 2 < 1) {
      for(let i = 1; i < Math.min(5, dataList.total_pages); i++) {
        pageList.push(i);
      }
    } else if (dataList.page + 2 >= dataList.total_pages) {
      for(let i = Math.max(1, dataList.total_pages - 2); i <= dataList.total_pages; i++) {
        pageList.push(i);
      }
    } else {
      for(let i = dataList.page - 2; i <= dataList.page + 2; i++) {
        pageList.push(i);
      }
    }
    return {
      pagePrevious,
      pageNext,
      pageList
    }
  }

  async getMovieNowPlaying(page) {
    try {
      const movieList = await movieService.getMovieNowPlaying(page);

      const { pagePrevious, pageNext, pageList } = this.paginationDataBuilder(movieList);

      this.setState((prevState, props) => {
        return { 
          ...prevState,
          movieList,
          movieListPagination: {
            previous: pagePrevious,
            list: pageList,
            next: pageNext,
            current: movieList.page,
            total: movieList.total_pages
          },
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
    return <div className="container">
        <header>
          <h1 className="App-title">Movies in theater</h1>
        </header>
        <div>
          {this.state.apiReady ? 
            this.state.apiError ?
              this.renderAPIError()
              :
              this.renderMovieList()
            :
            this.state.apiError ?
              this.renderAPIConfigurationError()
              :
              <ProgressBar />
            }
        </div>
      </div>;
  }

  renderAPIError() {
    return <div className="card horizontal">
        <div className="card-content">
          <p>
            <b>API Error.</b>
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
  }

  renderAPIConfigurationError() {
    return <div className="card horizontal">
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
  }

  renderMovieList() {
    return <React.Fragment>
        <Pagination {...this.state.movieListPagination} change={this.getMovieNowPlaying}/>
        <MovieDetailsContext.Provider value={{ movieDetails: this.state.movieDetails, getMovieDetails: this.getMovieDetails, deleteMovieDetails: this.deleteMovieDetails }}>
          <MovieList movieList={this.state.movieList.results} />
        </MovieDetailsContext.Provider>
        <Pagination {...this.state.movieListPagination} change={this.getMovieNowPlaying}/>
      </React.Fragment> 
  }
}

export default App;
