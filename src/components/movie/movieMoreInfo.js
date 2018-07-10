import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {ProgressBar} from 'react-materialize';

const MovieMoreInfo = (props) => 
    <React.Fragment>
        {props.apiStatus.apiLoadingStatus ?
            <ProgressBar />
            :
            <div>
                <div style={{ 
                    with: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: '#26a69a',
                    backgroundImage: `url(${props.movieDetails.backdrop_path})`}}>

                    <div className="App-modal-backdrop-alpha App-backdrop-image">
                        <img className="App-modal-poster" src={props.movieDetails.poster_path ? props.movieDetails.poster_path : ""} alt={`${props.movieDetails.title} Poster`} onError={(e)=> ReactDOM.findDOMNode(e.target).remove()}/>
                    </div>
                </div>
                <div className="modal-container App-modal-content">
                    <div>
                        <h3>{props.movieDetails.title} <small className="App-modal-movie-date App-secondary-text-color">({props.movieDetails.release_date ? props.movieDetails.release_date.split('-')[0] : ''})</small></h3>
                        <h5><em>{props.movieDetails.tagline}</em></h5>
                        <hr />
                        <h5>Info</h5>
                        <div className="App-modal-secondary-content">
                        <div className="valign-wrapper">
                            <i className="material-icons">poll</i>
                            <span className="App-movieDetails-vote">{(props.movieDetails.vote_average && props.movieDetails.vote_count) ? `${props.movieDetails.vote_average*10}%` : '#'}</span>
                            &nbsp;
                            <small className="App-secondary-text-color">{props.movieDetails.vote_count} vote(s)</small>
                        </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">date_range</i>
                                <span className="App-movieDetails-release App-secondary-text-color">{props.movieDetails.release_date ? props.movieDetails.release_date : 'None'}</span>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">access_time</i>
                                <span className="App-movieDetails-runtime App-secondary-text-color">{props.movieDetails.runtime ? `${props.movieDetails.runtime} minutes` : 'Unknown'}</span>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">play_circle_outline</i>
                                <span className="App-modal-videos App-secondary-text-color">
                                    {(props.movieDetails.videos && props.movieDetails.videos.results && props.movieDetails.videos.results.length) ? 
                                        props.movieDetails.videos.results.reduce((previous, result) => {
                                            if (result.type === 'Trailer' && result.site === 'YouTube') {
                                                previous.push(result);
                                            }
                                            return previous;
                                        }, [])
                                        .map((result, index) => 
                                            index < 3 ? <span key={result.key}>{index > 0 ? ', ': ''}<a href={`https://youtube.com/watch?v=${result.key}`} target="_blank">{result.name}</a></span> : null)
                                        : 
                                        'None'
                                    }
                                </span>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">local_offer</i>
                                <span className="App-modal-genres App-secondary-text-color">
                                    {(props.movieDetails.genres && props.movieDetails.genres.length) ? 
                                        props.movieDetails.genres.map((genre, index) => <span key={index}>{index > 0 ? ', ': ''}{genre.name}</span>)
                                        : 
                                        'None'
                                    }
                                </span>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">open_in_new</i>
                                <span className="App-movieDetails-homepage App-secondary-text-color">
                                    {props.movieDetails.homepage ? <a href={props.movieDetails.homepage} target="_blank">Official Website</a> : 'No official link'}
                                </span>
                                ,&nbsp;
                                <span className="App-movieDetails-imdb App-secondary-text-color">
                                    {props.movieDetails.imdb_id ? <a href={`https://www.imdb.com/title/${props.movieDetails.imdb_id}`} target="_blank">Imdb</a> : 'No imdb link'}
                                </span>
                            </div>
                            <div className="valign-wrapper">
                                <i className="material-icons">monetization_on</i>
                                <span className="App-modal-revenue App-secondary-text-color">
                                    {props.movieDetails.revenue ? props.movieDetails.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 4 }) : 'Unknown'}
                                </span>
                            </div>
                        </div>
                        {props.movieDetails.overview ?
                            <React.Fragment>
                                <h5>Overview</h5>
                                <p className="App-modal-overview App-content-text-color">
                                    {props.movieDetails.overview}
                                </p>
                            </React.Fragment>
                            :
                            null
                        }
                        {(props.movieDetails.credits && props.movieDetails.credits.cast && props.movieDetails.credits.cast.length) ? 
                            <React.Fragment>
                                <h5>Top Cast</h5>
                                <ul className="App-modal-cast">
                                    {props.movieDetails.credits.cast.map((credit, index) => 
                                        index < 5 ? 
                                        <li key={index}>
                                            <b>{credit.name}</b> {credit.character ? `(${credit.character})` : null}
                                        </li>
                                        : 
                                        null)}
                                </ul>
                            </React.Fragment>
                            : 
                            null
                        }
                    </div>
                </div>
            </div>
        }
    </React.Fragment>;

MovieMoreInfo.propTypes = {
    movieDetails: PropTypes.object.isRequired
}

export default MovieMoreInfo;