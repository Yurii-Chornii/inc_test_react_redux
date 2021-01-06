import {SET_USERS} from '../action-types'

const initialState = {
    users: null,
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_USERS : {
            return {...state, users: payload}
        }
        default: {
            return state;
        }
    }
}
export default reducer;
