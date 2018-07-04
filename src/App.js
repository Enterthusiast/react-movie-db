import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import AppWrapper from './containers/appWrapper';

const App = (props) => <AppWrapper {...props} />;

App.contextTypes = {
  store: PropTypes.object
}

export default App;