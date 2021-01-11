import React from 'react';
import {useDispatch} from "react-redux";
import {set_posts} from "../../redux/action-creators";
import './User.css';

export default function User({user, history}) {
    const dispatch = useDispatch();
    const getPosts = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
            .then(value => value.json())
            .then(value => dispatch(set_posts(value)))
    }
    const postsBtn = () => {
        history.push(`/posts/${user.id}`)
        getPosts()
    }

    return (
        <div className="user-box card">
            <div className="user-icon-box">
                <img src="https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg" alt="user icon"/>
            </div>
            <h4>{user.name}</h4>
            <h5 className='username'>({user.username})</h5>
            <h6>{user.email}</h6>
            <h6>{user.address.street} street, {user.address.city}</h6>
            <button className='btn btn-dark' onClick={postsBtn}>Posts</button>
        </div>
    );
}

