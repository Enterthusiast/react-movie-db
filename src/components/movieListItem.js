import React from 'react';
import PropTypes from 'prop-types';

const MovieListItem = (props) => 
    <div className="card horizontal">
        <div className="card-image">
            <img src={props.movieListItem.poster_path} alt={`${props.movieListItem.title} Poster`}/>
        </div>
        <div class="card-stacked">
            <div className="card-content">
                <h3 className="App-card-title">{props.movieListItem.title}</h3>
                <div className="App-card-secondary-content">
                    <div className="valign-wrapper">
                        <i className="material-icons">poll</i>
                        <span>{props.movieListItem.vote_average*10}%</span>&nbsp;
                        <small className="App-secondary-text-color">{props.movieListItem.vote_count} vote(s)</small>
                    </div>
                    <div className="valign-wrapper">
                        <i className="material-icons">date_range</i>
                        <span className="App-secondary-text-color">{props.movieListItem.release_date}</span>
                    </div>
                </div>
                <p className="App-content-text-color">
                    {props.movieListItem.overview.length > 256 ? props.movieListItem.overview.substr(0, 256)+'...' : props.movieListItem.overview}
                </p>
            </div>
            <div class="card-action">
                <a href="#">More info</a>
            </div>
        </div>
    </div>;

MovieListItem.propTypes = {
    movieListItem: PropTypes.object.isRequired
}

export default MovieListItem;