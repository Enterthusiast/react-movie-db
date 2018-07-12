import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, ProgressBar } from 'react-materialize';

import MovieListItem from './movieListItem';

class MovieList extends Component {
  componentDidMount() {
    this.observerInit();
  }

  componentDidUpdate() {
    this.observerInit();
  }

  observerInit() {
    const config = {
      // If the image gets within 50px in the Y axis, start the download.
      rootMargin: '50px 0px',
      threshold: 0.01,
    };

    const applyImgSrc = (target) => {
      const imgElement = target.querySelector('.App-poster-image-img');
      if (imgElement) {
        imgElement.src = imgElement.dataset.src;
      }
    };
    const onIntersection = (entries) => {
      // Loop through the entries
      entries.map((entry) => {
        // Are we in viewport?
        if (entry.intersectionRatio > 0) {
          // Stop watching and load the image
          this.observer.unobserve(entry.target);
          applyImgSrc(entry.target);
        }
        return entry;
      });
    };

    // Disconnect previous observer if any
    if (this.observer && typeof this.observer.disconnect === 'function') {
      this.observer.disconnect();
    }

    if ('IntersectionObserver' in window) {
      // The observer for the images on the page
      this.observer = new IntersectionObserver(onIntersection, config);

      // Observing every children
      if (this.movieListItemRef && Array.isArray(this.movieListItemRef)) {
        this.movieListItemRef.map(ref => (ref ? this.observer.observe(ref) : null));
      }

      // Support older browser
    } else if (this.movieListItemRef && Array.isArray(this.movieListItemRef)) {
      this.movieListItemRef.map(ref => (ref ? applyImgSrc(ref) : null));
    }
  }

  renderMovieList() {
    const { movieList } = this.props;

    this.movieListItemRef = [];
    return movieList.map(movieListItem => (
      <MovieListItem
        observerRefList={this.movieListItemRef}
        key={movieListItem.id + movieListItem.original_title}
        movieListItem={movieListItem}
      />
    ));
  }

  static renderNoResult() {
    return (
      <div className="card horizontal">
        <div className="card-content">
          <p className="App-movieList-no-result">
            <b>
              No result.
            </b>
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
      movieList,
      apiStatus,
    } = this.props;

    if (movieList && movieList.length) {
      return this.renderMovieList();
    }

    return apiStatus.apiLoadingStatus
      ? <ProgressBar />
      : this.constructor.renderNoResult();
  }
}

MovieList.propTypes = {
  apiStatus: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  movieList: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default MovieList;
