import { connect } from 'react-redux'
import Pagination from '../components/pagination'
import updateMovieListLogic from './logic/updateMovieListLogic';

const mapStateToProps = state => ({
    ...state.movieListPagination
})

const mapDispatchToProps = dispatch => ({
    updateMovieList: async (page) => {
        updateMovieListLogic(dispatch, page)
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination)