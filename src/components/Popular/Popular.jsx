import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import SingleTop from '../SingleTop/SingleTop';
import { Link } from 'react-router-dom';

const Popular = () => {

    const axiosPublic = useAxiosPublic();
    const contestUrl = `/contest/top`
    console.log(contestUrl)

    const { data: topContest = [], refetch } = useQuery({
        queryKey: ['topContest'],
        queryFn: async () => {
            const res = await axiosPublic.get(contestUrl);
            return res.data;
        }
    })
    return (
        <div className='max-w-7xl mx-auto -z-20'>
            <h1 className='uppercase text-center text-3xl font-bold py-5'>
                Top 5 Contests
            </h1>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>


                {
                    topContest.map(contest => {
                        return (
                            <SingleTop key={contest._id} contest={contest} />

                        )
                    })
                }
            </div>

            <div className='grid place-items-center'>
                <button className='mx-auto my-10'>
                    <Link to="/allcontest" className='btn w-full bg-secondary btn-secondary  h-10 bottom-3'>Sho All Contests</Link>
                </button>
            </div>

        </div>
    );
};

export default Popular;