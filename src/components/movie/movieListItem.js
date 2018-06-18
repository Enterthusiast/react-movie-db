import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import MovieMoreInfoModal from './movieMoreInfoModal';

const MovieListItem = (props) => 
    <div className="card horizontal">
        <div className="card-image App-poster-image">
            <img src={props.movieListItem.poster_path ? props.movieListItem.poster_path : ""} alt={`${props.movieListItem.title} Poster`} onError={(e)=> ReactDOM.findDOMNode(e.target).remove() }/>
        </div>
        <div className="card-stacked">
            <div className="card-content">
                <h3 className="App-card-title">{props.movieListItem.title}</h3>
                <div className="App-card-secondary-content">
                    <div className="valign-wrapper">
                        <i className="material-icons">poll</i>
                        <span className="App-movieListItem-vote">{(props.movieListItem.vote_average && props.movieListItem.vote_count) ? `${props.movieListItem.vote_average*10}%` : '#'}</span>
                        &nbsp;
                        <small className="App-secondary-text-color">{props.movieListItem.vote_count} vote(s)</small>
                    </div>
                    <div className="valign-wrapper">
                        <i className="material-icons">date_range</i>
                        <span className="App-movieListItem-release App-secondary-text-color">{props.movieListItem.release_date ? props.movieListItem.release_date : 'None'}</span>
                    </div>
                </div>
                <p className="App-content-text-color App-card-overview">
                    {(props.movieListItem.overview && props.movieListItem.overview.length > 184) ? props.movieListItem.overview.substr(0, 184)+'...' : props.movieListItem.overview}
                </p>
            </div>
            <div className="card-action App-card-action">
                {<MovieMoreInfoModal movieId={props.movieListItem.id}/>}
            </div>
        </div>
    </div>;

MovieListItem.propTypes = {
    movieListItem: PropTypes.object.isRequired
}

export default MovieListItem;