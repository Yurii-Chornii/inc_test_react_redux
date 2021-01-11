import './Comment.css';

export default function Comment({comment}) {
    return (
        <div className='card comment-wrapper mb-2'>
            <h6 className='mb-0'>{comment.name}</h6>
            <p className='email mb-2'>{comment.email}</p>
            <p className='mb-0'>{comment.body}</p>
        </div>
    );
}

