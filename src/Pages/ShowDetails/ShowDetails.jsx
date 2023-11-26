// import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ShowDetails = () => {
    const contest = useLoaderData();
    console.log(contest[0])
    const { contest_name, contest_category, contest_details } = contest[0]
    return (
        <div>
            <p className='text-4xl text-neutral-content'>{contest_name}</p>
            
        </div>
    );
};

export default ShowDetails;