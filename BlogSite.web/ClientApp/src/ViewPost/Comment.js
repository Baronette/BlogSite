import React from 'react';
import {format} from 'date-fns'

const Comment = ({comment: {name, text, date}}) => {
    return (
        <div className='mt-2'>
            <h5>{name}
            <small>    {format(new Date(date), 'cccc MMMM Lo, yyyy')}</small>
            </h5>
            <p>
            {text}
            </p>
        </div>
    )
}
export default Comment;