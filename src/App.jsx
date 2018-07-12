import React from 'react';
import PropTypes from 'prop-types';
import AppWrapper from './containers/appWrapper';

const App = props => <AppWrapper {...props} />;

App.contextTypes = {
  store: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default App;
