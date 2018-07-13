import React from 'react';
import PropTypes from 'prop-types';
import './movieMoreInfoModal.css';

import { Button, Modal } from 'react-materialize';

import MovieMoreInfo from '../../containers/movie/movieMoreInfo';

const MovieMoreInfoModal = ({
  movieId,
  getMovieDetails,
  clearMovieDetails,
}) => (movieId
  ? (
    <Modal
      header=""
      fixedFooter
      trigger={(
        <div>
          <Button waves="light" onClick={() => { getMovieDetails(movieId); }} className="App-more-button">
More Info
          </Button>
        </div>
)}
      modalOptions={{
        complete: () => { clearMovieDetails(); },
      }}
    >
      <MovieMoreInfo />
    </Modal>
  )
  : null);

MovieMoreInfoModal.propTypes = {
  movieId: PropTypes.number.isRequired,
  getMovieDetails: PropTypes.func.isRequired,
  clearMovieDetails: PropTypes.func.isRequired,
};

export default MovieMoreInfoModal;
