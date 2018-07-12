import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './appWrapper.css';
import { ProgressBar, Button } from 'react-materialize';
import MovieList from '../containers/movie/movieList';
import Pagination from '../containers/pagination';

class AppWrapper extends Component {
  componentWillMount() {
    this.props.updateMovieList(); // eslint-disable-line react/destructuring-assignment
  }

  renderAPIError() {
    const {
      apiStatus: {
        apiErrorDetails,
      },
    } = this.props;

    return (
      <div className="card horizontal">
        <div className="card-content">
          <p>
            <b>
              API Error.
            </b>
          </p>
          <br />
          <p>
            Error dump:
            <br />
            {JSON.stringify(apiErrorDetails)}
          </p>
          <br />
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  renderAPIConfigurationError() {
    const {
      apiStatus: {
        apiErrorDetails,
      },
    } = this.props;

    return (
      <div className="card horizontal">
        <div className="card-content">
          <p>
            <b>
              Couldn&apos;t reach the API to get the configuration.
            </b>
          </p>
          <br />
          <p>
            Error dump:
            <br />
            {JSON.stringify(apiErrorDetails)}
          </p>
          <br />
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const {
      apiStatus: {
        apiErrorStatus,
        apiLoadingStatus,
        apiErrorConfigStatus,
      },
      updateMovieList,
    } = this.props;

    return (
      <div className="container">
        {apiLoadingStatus
          ? <ProgressBar />
          : <div className="App-ProgressBar-placeholder" />}
        <div
          role="button"
          tabIndex={0}
          onClick={() => updateMovieList()}
          onKeyUp={(e) => { if (e.which === 13) updateMovieList(); }}
        >
          <h1 className="App-title">
            Movies in theater
          </h1>
        </div>
        <div className="App-content">
          {(() => {
            if (apiErrorConfigStatus) {
              // Error pre API configuration
              return apiErrorStatus ? this.renderAPIConfigurationError() : null;
            }

            return apiErrorStatus
              ? this.renderAPIError()
              : (
                <React.Fragment>
                  <Pagination />
                  <MovieList />
                  <Pagination />
                </React.Fragment>
              );
          })()}
        </div>
      </div>
    );
  }
}

AppWrapper.propTypes = {
  apiStatus: PropTypes.bool.isRequired,
  updateMovieList: PropTypes.func.isRequired,
};

export default AppWrapper;
