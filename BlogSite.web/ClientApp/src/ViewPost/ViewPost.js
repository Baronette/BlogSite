import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {format} from 'date-fns';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useAdmin } from '../AdminContext';

const ViewPost = () => {
    const [post, setPost] = useState({
        title: '',
        text: '',
        date: '',
    });
    const{admin} = useAdmin();
    const [showConfirm, setShowConfirm] = useState(false);
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    const onDeleteClick = async (id) => {
        await axios.post(`api/blogposts/delete`, { id });
        history.push('/');
    }
    useEffect(() => {
        const getPost = async () => {
            const { data } = await axios.get(`api/blogposts/getpost?id=${id}`);
            const { title, text, date, comments } = data
            setPost({ title, text, date});
            setComments(comments);
        }
        getPost();

    }, [id])
    const getComments = async() => {
        const {data} = await axios.get(`/api/blogposts/getcomments?id=${id}`);
        setComments(data);
    }
    const { title, text, date } = post
    return (
      <div className='pt-5 col-md-8'>
        {post.date && <div>
             <h1 className='mt-5'>{title}</h1>
            <p>by The Lucky Duck</p>
            <hr />
            {<p>Posted on {format(new Date(date), 'cccc MMMM Lo, yyyy')}</p> }
            <hr />
            <p>{text}</p>
            {admin && <button className='btn btn-light' onClick={() => setShowConfirm(true)}>Remove this post</button>}
                {showConfirm && <div className='mt-2'>
                    <h5>Delete this post?</h5>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger ml-3" onClick={() => {onDeleteClick(id); setShowConfirm(false)}}>Delete</button></div>}
            <CommentForm onSubmission = {getComments}/>
            {comments && comments.map((c,i)=> 
                <Comment
                key={i}
                comment={c}
                />
            )}
        </div>}
        </div>

    )
}
export default ViewPost;