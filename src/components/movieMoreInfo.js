import React from 'react';
import PropTypes from 'prop-types';

import {ProgressBar} from 'react-materialize';

const MovieMoreInfo = (props) => 
    <React.Fragment>
        {props.movieDetails.title ? 
            <div>
                <div style={{ 
                    with: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${props.movieDetails.backdrop_path})`}}>

                    <div className="App-modal-backdrop-alpha">
                        <img className="App-modal-poster" src={props.movieDetails.poster_path} alt={`${props.movieDetails.title} Poster`}/>
                    </div>
                </div>
                <div className="modal-container App-modal-content">
                    <div>
                        <h3>{props.movieDetails.title} <small className="App-modal-movie-date App-secondary-text-color">({props.movieDetails.release_date.split('-')[0]})</small></h3>
                        <h5><em>{props.movieDetails.tagline}</em></h5>
                        <hr />
                        <h5>Info</h5>
                        <div className="App-modal-secondary-content">
                            <div className="valign-wrapper">
                                <i className="material-icons">poll</i>
                                <span>{props.movieDetails.vote_average*10}%</span>&nbsp;
                                <small className="App-secondary-text-color">{props.movieDetails.vote_count} vote(s)</small>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">date_range</i>
                                <span className="App-secondary-text-color">{props.movieDetails.release_date}</span>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">access_time</i>
                                <span className="App-secondary-text-color">{props.movieDetails.runtime} minutes</span>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">play_circle_outline</i>
                                <span className="App-secondary-text-color">
                                    {(props.movieDetails.videos && props.movieDetails.videos.results) ? 
                                        props.movieDetails.videos.results.reduce((previous, result, index) => {
                                            if (index < 5 && result.type === 'Trailer' ) {
                                                previous.push(result);
                                            }
                                            return previous;
                                        }, [])
                                        .map((result, index) => 
                                            <span>{index > 0 ? ', ': ''}<a href={`https://youtube.com/watch?v=${result.key}`}>{result.name}</a></span>)
                                        : 
                                        ''
                                    }
                                </span>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">local_offer</i>
                                <span className="App-secondary-text-color">
                                    {props.movieDetails.genres ? 
                                        props.movieDetails.genres.map((genre, index) => <span>{index > 0 ? ', ': ''}{genre.name}</span>)
                                        : 
                                        ''
                                    }
                                </span>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">open_in_new</i>
                                <span className="App-secondary-text-color"><a href={props.movieDetails.homepage}>Official Website</a></span>
                                <span>,&nbsp;</span>
                                <span className="App-secondary-text-color"><a href={`https://www.imdb.com/title/${props.movieDetails.imdb_id}`}>Imdb</a></span>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">monetization_on</i>
                                <span className="App-secondary-text-color">
                                    {props.movieDetails.revenue ? props.movieDetails.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 4 }) : 'Unknown'}
                                </span>
                            </div>
                        </div>
                        <h5>Overview</h5>
                        <p className="App-content-text-color">
                            {props.movieDetails.overview}
                        </p>
                        <h5>Top Cast</h5>
                        <ul>
                            {(props.movieDetails.credits && props.movieDetails.credits.cast) ? 
                                props.movieDetails.credits.cast.map((credit, index) => 
                                    index < 5 ? 
                                    <li>
                                        <b>{credit.name}</b> ({credit.character})
                                    </li>
                                    : 
                                    '')
                                : 
                                ''
                            }
                        </ul>
                    </div>
                </div>
            </div>
            : 
            <ProgressBar />
        }
    </React.Fragment>;

MovieMoreInfo.propTypes = {
    movieDetails: PropTypes.object.isRequired
}

export default MovieMoreInfo;