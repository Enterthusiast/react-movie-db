import apiStatus from '../apiStatus';
import {
  UPDATE_API_LOADING_STATUS,
  UPDATE_API_ERROR_STATUS,
  UPDATE_API_ERROR_CONFIG_STATUS,
  UPDATE_API_ERROR_DETAILS,
} from '../../actions/actions';

describe('apiStatus', () => {
  it('return initial state', () => {
    expect(apiStatus(undefined, {})).toEqual({
      apiLoadingStatus: false,
      apiErrorStatus: false,
      apiErrorConfigStatus: false,
      apiErrorDetails: {},
    });
  });

  it('handle UPDATE_API_LOADING_STATUS', () => {
    expect(apiStatus(undefined, {
      type: UPDATE_API_LOADING_STATUS,
      apiLoadingStatus: true,
    })).toEqual({
      apiLoadingStatus: true,
      apiErrorStatus: false,
      apiErrorConfigStatus: false,
      apiErrorDetails: {},
    });
    expect(apiStatus(undefined, {
      type: UPDATE_API_LOADING_STATUS,
      apiLoadingStatus: false,
    })).toEqual({
      apiLoadingStatus: false,
      apiErrorStatus: false,
      apiErrorConfigStatus: false,
      apiErrorDetails: {},
    });
  });

  it('handle UPDATE_API_ERROR_STATUS', () => {
    expect(apiStatus(undefined, {
      type: UPDATE_API_ERROR_STATUS,
      apiErrorStatus: true,
    })).toEqual({
      apiLoadingStatus: false,
      apiErrorStatus: true,
      apiErrorConfigStatus: false,
      apiErrorDetails: {},
    });
    expect(apiStatus(undefined, {
      type: UPDATE_API_ERROR_STATUS,
      apiErrorStatus: false,
    })).toEqual({
      apiLoadingStatus: false,
      apiErrorStatus: false,
      apiErrorConfigStatus: false,
      apiErrorDetails: {},
    });
  });

  it('handle UPDATE_API_ERROR_CONFIG_STATUS', () => {
    expect(apiStatus(undefined, {
      type: UPDATE_API_ERROR_CONFIG_STATUS,
      apiErrorConfigStatus: true,
    })).toEqual({
      apiLoadingStatus: false,
      apiErrorStatus: false,
      apiErrorConfigStatus: true,
      apiErrorDetails: {},
    });
    expect(apiStatus(undefined, {
      type: UPDATE_API_ERROR_CONFIG_STATUS,
      apiErrorConfigStatus: false,
    })).toEqual({
      apiLoadingStatus: false,
      apiErrorStatus: false,
      apiErrorConfigStatus: false,
      apiErrorDetails: {},
    });
  });

  it('handle UPDATE_API_ERROR_DETAILS', () => {
    expect(apiStatus(undefined, {
      type: UPDATE_API_ERROR_DETAILS,
      apiErrorDetails: { details: 'it didn\'t go well' },
    })).toEqual({
      apiLoadingStatus: false,
      apiErrorStatus: false,
      apiErrorConfigStatus: false,
      apiErrorDetails: { details: 'it didn\'t go well' },
    });
    expect(apiStatus(undefined, {
      type: UPDATE_API_ERROR_DETAILS,
      apiErrorDetails: {},
    })).toEqual({
      apiLoadingStatus: false,
      apiErrorStatus: false,
      apiErrorConfigStatus: false,
      apiErrorDetails: {},
    });
  });
});
