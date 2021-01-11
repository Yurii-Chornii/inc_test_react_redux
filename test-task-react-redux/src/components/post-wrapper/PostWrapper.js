import {useDispatch} from 'react-redux';
import {set_current_post} from "../../redux/action-creators";
import './PostWrapper.css';


export default function PostWrapper ({post, history}){
    const dispatch = useDispatch();
    const details = () => {
        history.push(`/post/${post.id}`);
        dispatch(set_current_post(post))
    }

    return (
        <div className='post-wrapper card'>
            <h5>{post.title}</h5>
            <button className={'btn btn-info'} onClick={details}>Details</button>
        </div>
    );
}
