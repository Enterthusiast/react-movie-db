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
                        <h3>{props.movieDetails.title}</h3>
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
                        </div>
                        <h5>Overview</h5>
                        <p className="App-content-text-color">
                            {props.movieDetails.overview}
                        </p>
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