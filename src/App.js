import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import {ProgressBar, Button} from 'react-materialize';

import movieServiceInitializer from './services/movieService';
import MovieDetailsContext from './contexts/movieDetailsContext';

// BO redux
import MovieList from './containers/movie/movieList';
import Pagination from './containers/pagination';
import { updateMovieList, changePage, updateMovieDetails } from './actions/actions'
// EO redux

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieService: {},
      movieList: {
        results: []
      },
      movieListPagination: {
				previous: null,
				list: [],
				next: null,
				current: 1,
				total: 1
			},
      movieDetails: {},
      apiReady: false,
      apiLoading: false,
      apiError: false,
      apiErrorPayload: {}
    }

    // bindings
    this.getMovieNowPlaying = this.getMovieNowPlaying.bind(this);
    this.getMovieDetails = this.getMovieDetails.bind(this);
    this.deleteMovieDetails = this.deleteMovieDetails.bind(this);
  }

  async componentWillMount() {
    // init
    try {
      const movieService = await movieServiceInitializer();
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          movieService
        } 
      });

      await this.getMovieNowPlaying();
    } catch (error) {
      console.error(error);
    }
  }

  paginationDataBuilder(dataList) {
    const pagePrevious = (dataList.page - 1) > 0 ? dataList.page - 1 : null;
    const pageNext = (dataList.page + 1) <= dataList.total_pages ? dataList.page + 1 : null;
    
    let pageList = [];
    if(dataList.page - 2 < 1) {
      for(let i = 1; i <= Math.min(5, dataList.total_pages); i++) {
        pageList.push(i);
      }
    } else if (dataList.page + 2 >= dataList.total_pages) {
      for(let i = Math.max(1, dataList.total_pages - 4); i <= dataList.total_pages; i++) {
        pageList.push(i);
      }
    } else {
      for(let i = dataList.page - 2; i <= dataList.page + 2; i++) {
        pageList.push(i);
      }
    }
    return {
      previous: pagePrevious,
      next: pageNext,
      list: pageList,
      current: dataList.page,
      total: dataList.total_pages,
    }
  }

  async getMovieNowPlaying(page) {
    this.setState((prevState, props) => {
      return { 
        ...prevState,
        apiLoading: true
      } 
    });

    try {
      const movieList = await this.state.movieService.getMovieNowPlaying(page);


      const pagination = this.paginationDataBuilder({ 
        page: movieList.page,
        total_pages: movieList.total_pages 
      });

      // BO redux
      this.context.store.dispatch(updateMovieList(movieList.results));
      this.context.store.dispatch(changePage(pagination));
      // EO redux

      this.setState((prevState, props) => {
        return { 
          ...prevState,
          apiLoading: false,
          apiError: false
        } 
      })
    } catch(error) {
      console.error(error);
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          apiLoading: false,
          apiError: true,
          apiErrorPayload: error
        } 
      })
    }
  }

  async getMovieDetails(id) {
    this.setState((prevState, props) => {
      return { 
        ...prevState,
        apiLoading: true
      } 
    });

    try {
      const movieDetails = await this.state.movieService.getMovieDetails(id);

      // BO redux
      this.context.store.dispatch(updateMovieDetails(movieDetails));
      // EO redux

      this.setState((prevState, props) => {
        return { 
          ...prevState,
          apiLoading: false,
          apiError: false
        } 
      })
    } catch(error) {
      console.error(error);
      this.setState((prevState, props) => {
        return { 
          ...prevState,
          apiLoading: false,
          apiError: true,
          apiErrorPayload: error
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
        {this.state.apiLoading ? 
          <ProgressBar />
          :
          <div className="App-ProgressBar-placeholder"></div>}
        
        <header>
          <h1 className="App-title" onClick={(e) => window.location.reload()}>
            Movies in theater
          </h1>
        </header>
        <div>
          {this.state.movieService ?
              // Error post API configuration
              this.state.apiError ?
                this.renderAPIError()
                :
                this.renderMovieList()
              :
              // Error pre API configuration
              this.state.apiError ?
                this.renderAPIConfigurationError()
                :
                null
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
            {JSON.stringify(this.state.apiErrorPayload)}
          </p>
          <br />
          <Button onClick={(e) => window.location.reload()}>Retry</Button>
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
            {JSON.stringify(this.state.apiErrorPayload)}
          </p>
          <br />
          <Button onClick={(e) => window.location.reload()}>Retry</Button>
        </div>
      </div>
  }

  renderMovieList() {
    return <React.Fragment>
        <Pagination {...this.state.movieListPagination} change={this.getMovieNowPlaying}/>
        <MovieDetailsContext.Provider value={{ movieDetails: this.state.movieDetails, getMovieDetails: this.getMovieDetails, deleteMovieDetails: this.deleteMovieDetails }}>
          <MovieList apiLoading={this.state.apiLoading} />
        </MovieDetailsContext.Provider>
        <Pagination {...this.state.movieListPagination} change={this.getMovieNowPlaying}/>
      </React.Fragment> 
  }

}

App.contextTypes = {
  store: PropTypes.object
}

export default App;
