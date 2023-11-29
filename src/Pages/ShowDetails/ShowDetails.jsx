// import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';


const ShowDetails = () => {
    const contest = useLoaderData();

    const { _id, contest_name, contest_category, contest_deadline, contest_description, contest_image, contest_instruction, contest_prize, contest_price } = contest

    const [daysRemaining, setDaysRemaining] = useState(null);
    useEffect(() => {
        const calculateDaysRemaining = (deadlineDate) => {
            const today = new Date();
            const deadline = new Date(deadlineDate);

            // Calculate the difference in milliseconds
            const differenceInMillis = deadline - today;

            // Convert milliseconds to days
            const days = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));

            setDaysRemaining(days);
        };
        const deadlineFromMongoDB = new Date(contest_deadline.substring(0, 10)); // Replace with your actual deadline
        console.log(deadlineFromMongoDB)
        calculateDaysRemaining(deadlineFromMongoDB);
    }, [contest_deadline])
    return (
        <div className='max-w-7xl mx-auto flex gap-10 flex-col text-left md:text-left md:flex-row  pt-5'>
            <div className='md:w-1/2 w-3/5 border'>
                <img src={contest_image} />
            </div>
            <div className='flex flex-col md:gap-2'>
                <h1 className=' md:text-xl text-xl text-left text-neutral-content'>{contest_name}</h1>
                <p className='w-5/6 text-left mb-2'>{contest_description}</p>
                <hr/>
                <h4 className=' text-left text-neutral-content'>Category: <span className='text-red-500'>{contest_category}</span></h4>
                <p className='w-5/6 text-left'>Instruction: {contest_instruction}</p>
                <p className='text-left'>Prize : {contest_prize}</p>
                <p className='text-xl font-semibold  text-neutral-content'><span className='text-2xl text-red-content'>{daysRemaining} Days Remaining</span></p>
                <div className='grid border place-items-center'>
                    <div className="join mx-auto w-full">
                        <input className="input input-bordered join-item" defaultValue={contest_price} placeholder="Email" disabled />
                        {/* <button className="btn btn-secondary join-item rounded-r-xl">Join Now</button> */}
                        <Link to={`/payment/contest/${_id}`} className='btn join-item btn-secondary'>Participate Now</Link>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default ShowDetails;