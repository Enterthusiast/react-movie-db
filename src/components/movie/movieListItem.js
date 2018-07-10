import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import MovieMoreInfoModal from '../../containers/movie/movieMoreInfoModal';

class MovieListItem extends Component {
    render() {
        return <div ref={ ref => { this.props.observerRefList.push(ref) } } className="card horizontal">
            <div className="card-image App-poster-image">
                {/* 
                    We store the image link in the dataset (data-src).
                    The interection observer of the parent component will take care of setting the src path once the image is close to the viewport.
                */}
                <img className="App-poster-image-img" data-src={this.props.movieListItem.poster_path ? this.props.movieListItem.poster_path : ""} alt={`${this.props.movieListItem.title} Poster`} onError={(e)=> ReactDOM.findDOMNode(e.target).remove() }/>
            </div>
            <div className="card-stacked">
                <div className="card-content">
                    <h3 className="App-card-title">{this.props.movieListItem.title}</h3>
                    <div className="App-card-secondary-content">
                        <div className="valign-wrapper">
                            <i className="material-icons">poll</i>
                            <span className="App-movieListItem-vote">{(this.props.movieListItem.vote_average && this.props.movieListItem.vote_count) ? `${this.props.movieListItem.vote_average*10}%` : '#'}</span>
                            &nbsp;
                            <small className="App-secondary-text-color">{this.props.movieListItem.vote_count} vote(s)</small>
                        </div>
                        <div className="valign-wrapper">
                            <i className="material-icons">date_range</i>
                            <span className="App-movieListItem-release App-secondary-text-color">{this.props.movieListItem.release_date ? this.props.movieListItem.release_date : 'None'}</span>
                        </div>
                    </div>
                    <p className="App-content-text-color App-card-overview">
                        {(this.props.movieListItem.overview && this.props.movieListItem.overview.length > 184) ? this.props.movieListItem.overview.substr(0, 184)+'...' : this.props.movieListItem.overview}
                    </p>
                </div>
                <div className="card-action App-card-action">
                    {<MovieMoreInfoModal movieId={this.props.movieListItem.id}/>}
                </div>
            </div>
        </div>;
    }
}

MovieListItem.propTypes = {
    movieListItem: PropTypes.object.isRequired
}

export default MovieListItem;