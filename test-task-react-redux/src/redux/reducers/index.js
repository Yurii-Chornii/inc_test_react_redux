import {combineReducers} from "redux";
import users from './user-reducer'
import posts from './post-reducer'
import comments from './comments-reducer'

export const reducer = combineReducers({
    users,
    posts,
    comments
})
