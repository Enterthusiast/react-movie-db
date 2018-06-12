import React from 'react';

export default (props) => {
    return <React.Fragment>
        <hr/>
        <h2>{props.movieListItem.title}</h2>
        ({props.movieListItem.original_title})
        <br/>
        <img src={props.movieListItem.poster_path} alt={`${props.movieListItem.title} Poster`}/>
        <br/>
        {props.movieListItem.vote_average} ({props.movieListItem.vote_count})
        <br/>
        <img src={props.movieListItem.backdrop_path} alt={`${props.movieListItem.title} Backdrop`}/>
        <p>
            {props.movieListItem.overview}
        </p>
        {props.movieListItem.release_date}
    </React.Fragment>
}