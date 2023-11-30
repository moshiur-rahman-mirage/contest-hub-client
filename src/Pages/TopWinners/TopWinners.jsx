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
            {winners.map((winner) => (
                <div className='max-h-[80vh]' key={winner._id}>
                    <img className='object-cover' src={winner.img} alt={`Image ${winner._id}`} />
                    <p className="legend">Name : {winner.name}<br /> Total Win : {winner.win}</p>

                </div>
            ))}
        </div>
    );
};

export default TopWinners;