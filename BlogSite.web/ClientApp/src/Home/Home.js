import React, { useState, useEffect, useRef } from 'react';
import PostPreview from './PostPreview';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';


const Home = () => {
    const [posts, setPosts] = useState();
    const connectionRef = useRef(null);
    const onDeleteClick = async (id) => {
        await axios.post(`api/blogposts/delete`, { id });
        getPosts();
    }
    const getPosts = async () => {
        const { data } = await axios.get('/api/blogposts/getall');
        setPosts(data);
    }
    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/posts").build();
            await connection.start();
            connectionRef.current = connection;
            connection.on("new-post", post => {
                setPosts(posts => [post, ...posts]);

            })
        }
        getPosts();
        connectToHub();
    }, [])
    return (
        < div className='col-md-8 pt-5' >
            {posts && posts.map((p, i) => <PostPreview
                key={i}
                post={p}
                onDeleteClick={onDeleteClick} />)}
        </div >

    )
}

export default Home;