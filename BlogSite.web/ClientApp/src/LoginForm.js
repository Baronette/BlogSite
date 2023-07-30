import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAdmin } from './AdminContext';

const LoginForm = () => {
    const [password, setPassword] = useState()
    const history = useHistory()
    const [isValid, setIsValid] = useState(true);
    const { setAdmin } = useAdmin();

    const onFormSubmit = async ()=> {
        const { data } = await axios.post('/api/blogposts/login', {password});
        const isValid = !!data;
        setIsValid(isValid)
        if (isValid) {
            setAdmin(data);
            history.push('/addpost');
        }
    }


    return (
        <div className='container col-md-5 mt-3'>
            <div className='card card-body bg-light '>
                <h5>Enter administrative password to continue.</h5>
                <h6>Only authorized users can add posts.</h6>
                {!isValid && <p className='text-danger'>
                    Invalid username or password.
                    <br/>
                    Try again or return to the <Link to='/'>Home Page</Link>
                </p>}
                <input type='password' onChange={e => setPassword(e.target.value)} className='form-control mt-3' placeholder='Password'></input>
                <button className='btn btn-primary col-md-4 mt-3' onClick = {onFormSubmit}> Login</button>

            </div>
        </div>
    )
}
export default LoginForm;