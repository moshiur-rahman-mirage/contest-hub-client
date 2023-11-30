import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



const BestCreator = () => {

    const axiosPublic = useAxiosPublic();
    const contestUrl = `/users/top/creator`




    const { data: creators = [], refetch } = useQuery({
        queryKey: ['topcreator'],
        queryFn: async () => {
            const res = await axiosPublic.get(contestUrl);
            return res.data;
        }
    })


    return (
        <div>
            <div className='grid place-items-center py-10'>
            <h1 className='text-4xl uppercase font-bold'>Our Top Creator</h1>
            </div>
           

            <Carousel showArrows={true} >

                {creators.map((creator) => (
                    <div className='max-h-[80vh]' key={creator.id}>
                        <img className='object-cover' src={creator.contestCreatorPhoto} alt={`Image ${creator.id}`} />
                        <p className="legend">Name : {creator.contestCreatorName}<br/> Total Participants : {creator.totalParticipants}</p>
                        
                    </div>
                ))}


            </Carousel>
        </div>
    );
};

export default BestCreator;