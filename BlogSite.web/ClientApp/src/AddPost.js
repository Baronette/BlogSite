import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import LoginForm from './LoginForm';


const AddPost = () => {
    const { admin } = useAdmin();
    const history = useHistory();
    const [post, setPost] = useState({
        title: '',
        text: '',
    })
    const onTextChange = e => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitClick = async () => {
        const { data } = await axios.post(`/api/blogposts/addpost`, (post));
        history.push(`/viewpost/${data.id}`);
    }
    return (
        <div>
        {!admin && <LoginForm />}
        {admin && <div className="col-md-8 offset-md-2 card card-body bg-light">
             <h3>Add new post</h3>
                <input className='form-control' onChange={onTextChange} placeholder='Title'
                    value={post.title} name='title' type='text'></input>
                <br />
                <textarea
                    className='form-control' onChange={onTextChange} placeholder='Content Here'
                    value={post.text} name='text' type='text' rows='20' />
                <br />
                <button className='btn btn-primary btn-block' onClick={onSubmitClick}>Submit</button>
                </div>}

        </div>
    )

}
export default AddPost;