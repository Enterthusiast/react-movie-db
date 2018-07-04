import { connect } from 'react-redux'
import Pagination from '../components/pagination'
import { updateMovieList, changePage } from '../actions/actions'
import movieServiceInitializer from '../services/movieService';
import paginationFactory from '../utils/paginationFactory';

const mapStateToProps = state => ({
    ...state.movieListPagination
})

const mapDsipatchToProps = dispatch => ({
    change: async (page) => {
        const movieService = await movieServiceInitializer();
        const movieList = await movieService.getMovieNowPlaying(page);
        const movieListPagination = paginationFactory.buildPagination({ 
            page: movieList.page,
            total_pages: movieList.total_pages 
        });

        dispatch(updateMovieList(movieList.results));
        dispatch(changePage(movieListPagination));
    }
})

export default connect(
    mapStateToProps,
    mapDsipatchToProps
)(Pagination)