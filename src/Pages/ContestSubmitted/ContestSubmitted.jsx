import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ContestSubmitted = () => {
    const submissionData = useLoaderData();
    const {email}=submissionData[0]
    console.log(submissionData)
    return (
        <div>
          {email}
        </div>
    );
};

export default ContestSubmitted;