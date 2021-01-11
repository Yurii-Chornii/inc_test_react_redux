import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import PostWrapper from "../post-wrapper/PostWrapper";
import {add_new_post, change_modal_visible, set_posts} from "../../redux/action-creators";
import './Posts.css';

export default function Posts({match, history}) {
    const userId = match.params.id;
    const dispatch = useDispatch();
    const {posts, isPopupVisible} = useSelector(({posts}) => posts);

    const backBtn = () => {
        history.push('/');
        dispatch(set_posts(null))
    }

    const showOrCloseModal = () => dispatch(change_modal_visible());

    const body = document.body;
    if (isPopupVisible) body.classList.add('offScroll')
    else body.classList.remove('offScroll');

    const postNewPost = (userId, id, title, body) => {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({userId, id, title, body}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
    }

    const addNewPostForm = React.createRef();
    const addNewPost = () => {
        const newPost = {
            userId: +userId,
            id: new Date().getTime(),
            title: addNewPostForm.current[0].value,
            body: addNewPostForm.current[1].value
        };
        dispatch(add_new_post(newPost));
        postNewPost();
        showOrCloseModal();
    }

    return (
        <div>
            <button onClick={backBtn} className="btn btn-info">Back to users</button>
            <button onClick={showOrCloseModal} className="btn btn-success ml-2">Add new</button>
            <h2 className='posts-title'>Posts</h2>
            <div className="posts-wrapper card">
                {posts && posts.map((post) => <PostWrapper post={post} history={history} key={post.id}/>)}
            </div>

            {isPopupVisible &&
            <div className='modal-background'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add new post</h5>
                        <button type="button" className="close" onClick={showOrCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form ref={addNewPostForm}>
                            <div className="form-group">
                                <label htmlFor={'newPostTitle'}>Post title</label>
                                <input id={'newPostTitle'} className="form-control mb-3" type="text"/>
                                <label htmlFor={'newPostBody'}>Post body</label>
                                <textarea id={'newPostBody'} className="form-control" rows="3"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer pt-0">
                        <button type="button" className="btn btn-secondary" onClick={showOrCloseModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={addNewPost}>Save new post</button>
                    </div>
                </div>

            </div>
            }
        </div>
    );
}

