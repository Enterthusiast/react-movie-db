import React from 'react';
import PropTypes from 'prop-types';

const MovieMoreInfoModal = (props) =>
    props.movieId ?
        <div>MockMovieMoreInfo</div>
        :
        null;

MovieMoreInfoModal.propTypes = {
    movieId: PropTypes.number.isRequired
}

export default MovieMoreInfoModal;