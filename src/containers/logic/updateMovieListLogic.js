import { 
    updateMovieList,
    changePage, 
    updateApiLoadingStatus, 
    updateApiErrorStatus,
    updateApiErrorConfigStatus,
    updateApiErrorDetails } from '../../actions/actions'
import movieServiceInitializer from '../../services/movieService';
import paginationFactory from '../../utils/paginationFactory';

const updateMovieListLogic = async (dispatch, page) => {

    dispatch(updateApiErrorStatus(false));
    dispatch(updateApiErrorConfigStatus(false));

    dispatch(updateApiLoadingStatus(true));

    let movieService = {};
    try {
        movieService = await movieServiceInitializer();
    } catch(error) {
        dispatch(updateApiErrorDetails(error));
        dispatch(updateApiErrorStatus(true));
        dispatch(updateApiErrorConfigStatus(true));

        dispatch(updateApiLoadingStatus(false));
    }

    try {
        const movieList = await movieService.getMovieNowPlaying(page);
        const movieListPagination = paginationFactory.buildPagination({ 
            page: movieList.page,
            total_pages: movieList.total_pages 
        });

        dispatch(updateMovieList(movieList.results));
        dispatch(changePage(movieListPagination));

        dispatch(updateApiLoadingStatus(false));
    } catch(error) {
        dispatch(updateApiErrorDetails(error));
        dispatch(updateApiErrorStatus(true));

        dispatch(updateApiLoadingStatus(false));
    }

}

export default updateMovieListLogic;