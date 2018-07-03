import { CHANGE_PAGE } from '../actions/actions'

const initialState = {
    previous: null,
    list: [],
    next: null,
    current: 1,
    total: 1
}

const movieListPagination = function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                ...action.pagination
            }
        default:
            return state
    }
}

export default movieListPagination;