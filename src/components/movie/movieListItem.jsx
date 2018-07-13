import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './movieListItem.css';

import MovieMoreInfoModal from '../../containers/movie/movieMoreInfoModal';

class MovieListItem extends Component {
  render() {
    const {
      observerRefList,
      movieListItem: {
        poster_path: posterPath,
        title,
        release_date: releaseDate,
        vote_average: voteAverage,
        vote_count: voteCount,
        overview,
        id,
      },
    } = this.props;

    return (
      <div ref={(ref) => { observerRefList.push(ref); }} className="card horizontal">
        <div className="card-image App-poster-image">
          {/*
              We store the image link in the dataset (data-src).
              The interection observer of the parent component will take care
              of setting the src path once the image is close to the viewport.
          */}
          <img className="App-poster-image-img" data-src={posterPath || ''} alt={`${title} Poster`} onError={e => ReactDOM.findDOMNode(e.target).remove() /* eslint-disable-line react/no-find-dom-node */} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <h3 className="App-card-title">
              {title}
            </h3>
            <div className="App-card-secondary-content">
              <div className="valign-wrapper">
                <i className="material-icons">
poll
                </i>
                <span className="App-movieListItem-vote">
                  {(voteAverage && voteCount) ? `${voteAverage * 10}%` : '#'}
                </span>
                            &nbsp;
                <small className="App-secondary-text-color">
                  {voteCount}
                  {' '}
vote(s)
                </small>
              </div>
              <div className="valign-wrapper">
                <i className="material-icons">
date_range
                </i>
                <span className="App-movieListItem-release App-secondary-text-color">
                  {releaseDate || 'None'}
                </span>
              </div>
            </div>
            <p className="App-content-text-color App-card-overview">
              {(overview && overview.length > 184) ? `${overview.substr(0, 184)}...` : overview}
            </p>
          </div>
          <div className="card-action App-card-action">
            {<MovieMoreInfoModal movieId={id} />}
          </div>
        </div>
      </div>
    );
  }
}

MovieListItem.propTypes = {
  movieListItem: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  observerRefList: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default MovieListItem;
