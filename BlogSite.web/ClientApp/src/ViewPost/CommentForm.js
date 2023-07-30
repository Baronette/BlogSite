import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const CommentForm = ({onSubmission}) => {
    const [comment, setComment] = useState({
        name: '',
        text: '',
    })
    const {id} = useParams();
    
    useEffect(() => {
        const commenterName = localStorage.getItem('commenter-name');
        if(commenterName)
        {
            setComment({name: commenterName, text:''})
        }
    },[])
    const onTextChange = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        });    
    }
    const onSubmitClick = async () => {
        await axios.post(`/api/blogposts/addcomment`, ({...comment, blogPostId: id}));
        setComment({name: comment.name, text:''});
        localStorage.setItem('commenter-name', comment.name);
        onSubmission();
    }
    return (
        <div className="card my-4">
            <h5 className="card-header">Leave a Comment:</h5>
            <div className="card-body">
                <div className="form-group">
                    <input type="text"
                        value={comment.name}
                        placeholder="Name"
                        className="form-control"
                        onChange={onTextChange}
                        name="name" />
                </div>
                <div className="form-group">
                    <textarea
                        className='form-control'
                        onChange={onTextChange}
                        placeholder='Your Comment here'
                        value={comment.text}
                        name='text'
                        type='text'
                        rows='3' />
                </div>
                <button disabled={!comment.name || !comment.text}
                    onClick={onSubmitClick}
                    className="btn btn-primary">Submit
                </button>

            </div>
        </div>
    )
}
export default CommentForm;

