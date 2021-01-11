import {
    ADD_NEW_POST,
    CHANGE_MODAL_VISIBLE,
    DELETE_CURRENT_POST,
    EDIT_POST,
    SET_CURRENT_POST,
    SET_POSTS,
    TOGGLE_EDIT_POST_INPUTS
} from "../action-types";

export const set_posts = (payload) => ({type: SET_POSTS, payload});
export const set_current_post = (payload) => ({type: SET_CURRENT_POST, payload});
export const change_modal_visible = () => ({type: CHANGE_MODAL_VISIBLE});
export const add_new_post = (payload) => ({type: ADD_NEW_POST, payload});
export const delete_current_post = (payload) => ({type: DELETE_CURRENT_POST, payload});
export const edit_post = (payload) => ({type: EDIT_POST, payload});
export const toggle_edit_post_inputs = () => ({type: TOGGLE_EDIT_POST_INPUTS});
