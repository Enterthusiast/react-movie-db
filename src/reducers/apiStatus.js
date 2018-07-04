import { UPDATE_API_LOADING_STATUS, UPDATE_API_ERROR_STATUS, UPDATE_API_ERROR_CONFIG_STATUS, UPDATE_API_ERROR_DETAILS } from '../actions/actions'

const initialState = {
    apiLoadingStatus: false,
    apiErrorStatus: false,
    apiErrorConfigStatus: false,
    apiErrorDetails: {}
}

const apiStatus = function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_API_LOADING_STATUS:
        return {
            ...state,
            apiLoadingStatus: action.apiLoadingStatus
        }
    case UPDATE_API_ERROR_STATUS:
        return {
            ...state,
            apiErrorStatus: action.apiErrorStatus
        }
    case UPDATE_API_ERROR_CONFIG_STATUS:
        return {
            ...state,
            apiErrorStatus: action.apiErrorConfigStatus
        }
    case UPDATE_API_ERROR_DETAILS:
        return {
            ...state,
            apiErrorDetails: action.apiErrorDetails
        }
    default:
        return state
  }
}

export default apiStatus;