import { connect } from 'react-redux';
import AppWrapper from '../components/appWrapper';
import updateMovieListLogic from './logic/updateMovieListLogic';

const mapStateToProps = state => ({
  apiStatus: state.apiStatus,
});

const mapDispatchToProps = dispatch => ({
  updateMovieList: async (page) => {
    updateMovieListLogic(dispatch, page);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppWrapper);
