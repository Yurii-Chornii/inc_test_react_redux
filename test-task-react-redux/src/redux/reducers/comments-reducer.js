import {SET_COMMENTS} from '../action-types'

const initialState = {
    comments: null
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_COMMENTS : {
            return {...state, comments: payload}
        }
        default: {
            return state;
        }
    }
}
export default reducer;
