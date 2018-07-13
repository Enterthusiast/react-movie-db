import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './movieMoreInfo.css';

import { ProgressBar } from 'react-materialize';

const MovieMoreInfo = ({
  movieDetails: {
    backdrop_path: backdropPath,
    poster_path: posterPath,
    title,
    release_date: releaseDate,
    tagline,
    vote_average: voteAverage,
    vote_count: voteCount,
    runtime,
    videos,
    genres,
    homepage,
    imdb_id: imdbId,
    revenue,
    overview,
    credits,
  },
  apiStatus: {
    apiLoadingStatus,
  },
}) => (
  <React.Fragment>
    {apiLoadingStatus
      ? <ProgressBar />
      : (
        <div>
          <div style={{
            with: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: '#26a69a',
            backgroundImage: `url(${backdropPath})`,
          }}
          >

            <div className="App-modal-backdrop-alpha App-backdrop-image">
              <img className="App-modal-poster" src={posterPath || ''} alt={`${title} Poster`} onError={e => ReactDOM.findDOMNode(e.target).remove() /* eslint-disable-line react/no-find-dom-node */} />
            </div>
          </div>
          <div className="modal-container App-modal-content">
            <div>
              <h3>
                {title}
                {' '}
                <small className="App-modal-movie-date App-secondary-text-color">
                  (
                  {releaseDate ? releaseDate.split('-')[0] : ''}
                  )
                </small>
              </h3>
              <h5>
                <em>
                  {tagline}
                </em>
              </h5>
              <hr />
              <h5>
                Info
              </h5>
              <div className="App-modal-secondary-content">
                <div className="valign-wrapper">
                  <i className="material-icons">
                    poll
                  </i>
                  <span className="App-movieDetails-vote">
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
                  <span className="App-movieDetails-release App-secondary-text-color">
                    {releaseDate || 'None'}
                  </span>
                </div>
                <div className="valign-wrapper">
                  <i className="material-icons">
                    access_time
                  </i>
                  <span className="App-movieDetails-runtime App-secondary-text-color">
                    {runtime ? `${runtime} minutes` : 'Unknown'}
                  </span>
                </div>
                <div className="valign-wrapper">
                  <i className="material-icons">
                    play_circle_outline
                  </i>
                  <span className="App-modal-videos App-secondary-text-color">
                    {(videos && videos.results && videos.results.length)
                      ? videos.results.reduce((previous, result) => {
                        if (result.type === 'Trailer' && result.site === 'YouTube') {
                          previous.push(result);
                        }
                        return previous;
                      }, [])
                        .map((result, index) => (index < 3 ? (
                          <span key={result.key}>
                            {index > 0 ? ', ' : ''}
                            <a href={`https://youtube.com/watch?v=${result.key}`} target="_blank" rel="noopener noreferrer">
                              {result.name}
                            </a>
                          </span>
                        ) : null))
                      : 'None'
                                    }
                  </span>
                </div>
                <div className="valign-wrapper">
                  <i className="material-icons">
                    local_offer
                  </i>
                  <span className="App-modal-genres App-secondary-text-color">
                    {(genres && genres.length)
                      ? genres.map((genre, index) => (
                        <span key={genre.id}>
                          {index > 0 ? ', ' : ''}
                          {genre.name}
                        </span>
                      ))
                      : 'None'
                                    }
                  </span>
                </div>
                <div className="valign-wrapper">
                  <i className="material-icons">
                    open_in_new
                  </i>
                  <span className="App-movieDetails-homepage App-secondary-text-color">
                    {homepage ? (
                      <a href={homepage} target="_blank" rel="noopener noreferrer">
                        Official Website
                      </a>
                    ) : 'No official link'}
                  </span>
                                ,&nbsp;
                  <span className="App-movieDetails-imdb App-secondary-text-color">
                    {imdbId ? (
                      <a href={`https://www.imdb.com/title/${imdbId}`} target="_blank" rel="noopener noreferrer">
                        Imdb
                      </a>
                    ) : 'No imdb link'}
                  </span>
                </div>
                <div className="valign-wrapper">
                  <i className="material-icons">
                    monetization_on
                  </i>
                  <span className="App-modal-revenue App-secondary-text-color">
                    {revenue ? revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 4 }) : 'Unknown'}
                  </span>
                </div>
              </div>
              {overview
                ? (
                  <React.Fragment>
                    <h5>
                      Overview
                    </h5>
                    <p className="App-modal-overview App-content-text-color">
                      {overview}
                    </p>
                  </React.Fragment>
                )
                : null
                        }
              {(credits && credits.cast && credits.cast.length)
                ? (
                  <React.Fragment>
                    <h5>
                      Top Cast
                    </h5>
                    <ul className="App-modal-cast">
                      {credits.cast.map((credit, index) => (index < 5
                        ? (
                          <li key={credit.credit_id}>
                            <b>
                              {credit.name}
                            </b>
                            {' '}
                            {credit.character ? `(${credit.character})` : null}
                          </li>
                        )
                        : null))}
                    </ul>
                  </React.Fragment>
                )
                : null
                        }
            </div>
          </div>
        </div>
      )
        }
  </React.Fragment>
);

MovieMoreInfo.propTypes = {
  movieDetails: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  apiStatus: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default MovieMoreInfo;
