import { connect } from 'react-redux'
import Pagination from '../components/pagination'

const mapStateToProps = state => ({
    ...state.movieListPagination
})

export default connect(
    mapStateToProps
)(Pagination)