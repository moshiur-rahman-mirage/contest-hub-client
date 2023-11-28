// import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';


const ShowDetails = () => {
    const contest = useLoaderData();

    const { _id,contest_name, contest_category, contest_deadline, contest_description, contest_image, contest_instruction, contest_prize, contest_price } = contest[0]
    
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
        const deadlineFromMongoDB =new Date(contest_deadline.substring(0,10)); // Replace with your actual deadline
        console.log(deadlineFromMongoDB)
        calculateDaysRemaining(deadlineFromMongoDB);
    }, [contest_deadline])
  return (
        <div className='max-w-7xl mx-auto flex gap-5 flex-col text-center md:text-left md:flex-row  pt-5'>
            <div className='md:w-1/2 border'>
                <img src={contest_image} />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className=' text-3xl text-neutral-content'>{contest_name}</h1>
                <p className='text-xl w-5/6 font-bold text-neutral-500 border-b-2 pb-2'>Category</p>
                <h4 className='text-xl font-semibold text-neutral-500'>{contest_category}</h4>
                <p className='text-xl w-5/6 font-bold text-neutral-500 border-b-2 pb-2'>Description</p>
                <p className='w-5/6 mb-2'>{contest_description}</p>
                <p className='text-xl w-5/6 font-bold text-neutral-500 border-b-2 pb-2'>Instruction</p>
                <p className='w-5/6'>{contest_instruction}</p>
                <p className='text-xl w-5/6 font-bold text-neutral-500 border-b-2 pb-2'>What You Will Get</p>
                <p>{contest_prize}</p>
                <p className='text-xl font-semibold  text-neutral-500'>Join Before Deadline!! <span className='text-2xl text-red-500'>{daysRemaining} Days Remaining</span></p>
                <div className="join w-full">
                    <input className="input input-bordered join-item" defaultValue={contest_price} placeholder="Email" disabled />
                    {/* <button className="btn btn-secondary join-item rounded-r-xl">Join Now</button> */}
                    <Link to={`/payment/contest/${_id}`}  className='btn join-item btn-secondary'>Join Now</Link>
                </div>

            </div>


        </div>
    );
};

export default ShowDetails;