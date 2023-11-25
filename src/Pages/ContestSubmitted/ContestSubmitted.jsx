import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ContestSubmitted = () => {
    const submissionData = useLoaderData();
    return (
        <div>
            Contest Submitted
        </div>
    );
};

export default ContestSubmitted;