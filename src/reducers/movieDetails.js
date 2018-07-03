import { CHANGE_PAGE } from '../actions/actions'

const initialState = {}

const movieDetails = function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                ...action.details
            }
        default:
            return state
    }
}

export default movieDetails;