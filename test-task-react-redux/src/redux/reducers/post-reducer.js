import {SET_POSTS, SET_CURRENT_POST, CHANGE_MODAL_VISIBLE, ADD_NEW_POST, DELETE_CURRENT_POST, EDIT_POST, TOGGLE_EDIT_POST_INPUTS} from '../action-types'

const initialState = {
    posts: null,
    currentPost: null,
    isPopupVisible: false,
    isEditInputsVisible: false
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_POSTS : {
            return {...state, posts: payload}
        }
        case SET_CURRENT_POST : {
            return {...state, currentPost: payload}
        }
        case CHANGE_MODAL_VISIBLE : {
            return {...state, isPopupVisible: !state.isPopupVisible}
        }
        case ADD_NEW_POST : {
            return {...state, posts: [...state.posts, payload]}
        }
        case DELETE_CURRENT_POST : {
            return {...state, currentPost: null, posts: payload}
        }
        case EDIT_POST : {
            const changedPosts = state.posts.map(item => item.id === payload.id ? payload : item);
            return {...state, posts: changedPosts}
        }
        case TOGGLE_EDIT_POST_INPUTS : {
            return {...state, isEditInputsVisible: !state.isEditInputsVisible}
        }
        default: {
            return state;
        }
    }
}
export default reducer;
