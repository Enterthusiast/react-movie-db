import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import {ProgressBar, Button} from 'react-materialize';

import movieServiceInitializer from './services/movieService';
import paginationFactory from './utils/paginationFactory';

// BO redux
import MovieList from './containers/movie/movieList';
import Pagination from './containers/pagination';
import { updateMovieList, changePage } from './actions/actions'
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
  }

  async componentWillMount() {
    // init
    try {
      const movieService = await movieServiceInitializer();
      const movieList = await movieService.getMovieNowPlaying();
      const movieListPagination = paginationFactory.buildPagination({ 
          page: movieList.page,
          total_pages: movieList.total_pages 
      });

      this.context.store.dispatch(updateMovieList(movieList.results));
      this.context.store.dispatch(changePage(movieListPagination));

      this.setState((prevState, props) => {
        return { 
          ...prevState,
          movieService
        } 
      });
    } catch (error) {
      console.error(error);
    }
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
        <Pagination {...this.state.movieListPagination} />
          <MovieList apiLoading={this.state.apiLoading} />
        <Pagination {...this.state.movieListPagination} />
      </React.Fragment> 
  }

}

App.contextTypes = {
  store: PropTypes.object
}

export default App;
