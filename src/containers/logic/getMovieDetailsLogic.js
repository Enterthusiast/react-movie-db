import {
  updateApiLoadingStatus,
  updateApiErrorStatus,
  updateApiErrorConfigStatus,
  updateApiErrorDetails,
  updateMovieDetails,
} from '../../actions/actions';
import movieServiceInitializer from '../../services/movieService';

const getMovieDetailsLogic = async (dispatch, movieId) => {
  dispatch(updateApiErrorStatus(false));
  dispatch(updateApiErrorConfigStatus(false));

  dispatch(updateApiLoadingStatus(true));

  let movieService = {};
  try {
    movieService = await movieServiceInitializer();
  } catch (error) {
    dispatch(updateApiErrorDetails(error));
    dispatch(updateApiErrorStatus(true));
    dispatch(updateApiErrorConfigStatus(true));

    dispatch(updateApiLoadingStatus(false));
  }

  try {
    movieService = await movieServiceInitializer();
    const movieDetails = await movieService.getMovieDetails(movieId);

    dispatch(updateMovieDetails(movieDetails));

    dispatch(updateApiLoadingStatus(false));
  } catch (error) {
    dispatch(updateApiErrorDetails(error));
    dispatch(updateApiErrorStatus(true));

    dispatch(updateApiLoadingStatus(false));
  }
};

export default getMovieDetailsLogic;
