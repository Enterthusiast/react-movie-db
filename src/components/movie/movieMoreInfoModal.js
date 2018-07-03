import React from 'react';
import PropTypes from 'prop-types';

import {Button, Modal} from 'react-materialize';

import MovieMoreInfo from '../../containers/movie/movieMoreInfo';

const MovieMoreInfoModal = (props) =>
    props.movieId ?
        <Modal
            header=""
            fixedFooter
            trigger={<Button waves="light" className="App-more-button">More Info</Button>}
            modalOptions={{
                ready: () => { props.getMovieDetails(props.movieId) },
                complete: () => { props.clearMovieDetails() }
            }}>
            <MovieMoreInfo />
        </Modal>
        :
        null;
        
MovieMoreInfoModal.propTypes = {
    movieId: PropTypes.number.isRequired,
    getMovieDetails: PropTypes.func.isRequired,
    clearMovieDetails: PropTypes.func.isRequired
}

export default MovieMoreInfoModal;