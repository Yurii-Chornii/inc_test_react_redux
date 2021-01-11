import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Comment from "../comment/Comment";
import {delete_current_post, edit_post, set_comments, toggle_edit_post_inputs} from "../../redux/action-creators";
import './Post.css'


export default function Post({history}) {
    const {posts, comments, currentPost, isEditInputsVisible} = useSelector(({posts: {posts, currentPost, isEditInputsVisible}, comments: {comments}}) => ({posts, comments, currentPost, isEditInputsVisible}));

    const dispatch = useDispatch();

    const backBtn = () => {
        history.push('/posts/' + currentPost.userId);
        dispatch(set_comments(null))
    }
    const getComments = () => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${currentPost.id}`)
            .then(value => value.json())
            .then(value => dispatch(set_comments(value)))
    }
    const deletePost = () => {
        const filteredPosts = posts.filter(post => post.id !== currentPost.id);
        fetch(`https://jsonplaceholder.typicode.com/posts/${currentPost.id}`, {method: 'DELETE'})
            .then(response => {
                backBtn();
                dispatch(delete_current_post(filteredPosts));
            })
    }

    const showOrCloseEditForm = () => dispatch(toggle_edit_post_inputs());

    const [title, setTitle] = useState(currentPost.title)
    const [body, setBody] = useState(currentPost.body)
    const commitTitle = (e) => setTitle(e.target.value);
    const commitBody = (e) => setBody(e.target.value)

    const editPost = (e) => {
        e.preventDefault();
        currentPost.title = title;
        currentPost.body = body;
        fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
            // лінк вище спеціально зробив незмінним, бо нові пости мають id-шки більші, ніж ті, які є у сервера, і щоб при запитах не падала помилка
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentPost)
        })
            .then(response => {
                dispatch(edit_post(currentPost))
                showOrCloseEditForm()
            })
    }

    useEffect(() => {
        getComments()
    }, [])


    return (
        <div>
            <button onClick={backBtn} className="btn btn-info">Back to posts</button>
            <h2 className='posts-title'>Post</h2>
            <div className="post-box card">
                {!isEditInputsVisible &&
                <div>
                    <h4>{currentPost.title}</h4>
                    <p>{currentPost.body}</p>
                    <div className="buttons-box">
                        <button className="btn btn-success mr-3" onClick={showOrCloseEditForm}>Edit</button>
                        <button className="btn btn-info" onClick={deletePost}>Delete</button>
                    </div>
                </div>
                }
                {isEditInputsVisible &&
                <div>
                    <form onSubmit={editPost}>
                        <div className="form-group">
                            <label htmlFor={'editPostTitle'}>Post title</label>
                            <input id={'editPostTitle'} onInput={commitTitle} value={title} className="form-control mb-3" type="text"/>
                            <label htmlFor={'editPostBody'}>Post body</label>
                            <textarea id={'editPostBody'} onInput={commitBody} value={body} className="form-control" rows="3"/>
                            <div className="buttons-box">
                                <button className="btn btn-success mr-3" onClick={editPost}>Save</button>
                                <button className="btn btn-info" onClick={showOrCloseEditForm}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
                }

                {!!comments && !!comments.length &&
                <div className='mt-3'>
                    <h4>Comments</h4>
                    {comments && comments.map((comment) => <Comment comment={comment} key={comment.id}/>)}
                </div>
                }
            </div>
        </div>
    );
}

