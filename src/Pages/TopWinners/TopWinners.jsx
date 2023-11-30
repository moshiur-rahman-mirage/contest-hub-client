import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const TopWinners = () => {
    const axiosPublic = useAxiosPublic();
    const contestUrl = `/users/winner/top`


    const { data: winners = [], refetch } = useQuery({
        queryKey: ['topwinner'],
        queryFn: async () => {
            const res = await axiosPublic.get(contestUrl);
            return res.data;
        }
    })


    return (
        <div>
            <div className='grid place-items-center text-4xl uppercase py-10'>
                <h2>Top Winner</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {winners.map((winner) => (
                    <div key={winner._id} className="card bg-base-100 shadow-xl">
                        <figure><img className='h-60' src={winner.img} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Name: {winner.name}</h2>
                            <h2 className="card-title">Total Win:{winner.win}</h2>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopWinners;