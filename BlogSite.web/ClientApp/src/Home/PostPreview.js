import React from 'react';
import { Link} from 'react-router-dom';
import { format } from 'date-fns'
import { useAdmin } from '../AdminContext';
import { useState } from 'react';


const PostPreview = ({ post: { text, date, title, id, comments }, onDeleteClick }) => {
    const { admin } = useAdmin();
    const [showConfirm, setShowConfirm] = useState(false)
    
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h2 className="card-title">
                    <Link to={`/viewpost/${id}`}>
                        {title}
                    </Link>
                </h2>
                <p className="card-text">{text.length < 200 ? text : text.substring(0, 200) + "..."}</p>
                <div className='mb-3'>
                    <small>{comments.length} comment(s)</small>
                </div>
                <Link to={`/viewpost/${id}`} className='btn btn-primary'>
                    Read More &rarr;
                </Link>
                {admin && <button className='btn btn-danger btn-light ml-5' onClick={() => setShowConfirm(true)}>Remove this post</button>}
                {showConfirm && <div className='mt-2'>
                    <h5>Delete this post?</h5>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger ml-3" onClick={() => {onDeleteClick(id); setShowConfirm(false)}}>Delete</button></div>}
            </div>
            <div className="card-footer text-muted">
                Posted on {format(new Date(date), 'cccc MMMM Lo, yyyy')}
            </div>
        </div>
    )
}
export default PostPreview;