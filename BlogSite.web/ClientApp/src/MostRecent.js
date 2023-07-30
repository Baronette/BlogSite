import React, { useEffect } from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const MostRecent = () => {
    const history = useHistory();
    useEffect(() => {
        const getMostRecent = async () => {
            const { data } = await axios.get(`/api/blogposts/getmostrecent`)
            console.log(data);
            history.push(`/viewpost/${data}`);
        }
        getMostRecent();
    }, [])
    return (<></>)
}
export default MostRecent;