import { CHANGE_PAGE } from '../actions/actions'

const initialState = {
    apiReady: false,
    apiLoading: false,
    apiError: false,
    apiErrorPayload: {}
}

const apiStatus = function(state = initialState, action) {
  switch (action.type) {
      case CHANGE_PAGE:
          return {
              ...state,
              ...action.status
          }
      default:
        return state
  }
}

export default apiStatus;