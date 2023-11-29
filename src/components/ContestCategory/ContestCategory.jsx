import React, { useState } from 'react';
// import SingleCategory from './SingleCategory';

import { useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SingleCategory from '../SingleCategory/SingleCategory';
import { useQuery } from '@tanstack/react-query';

const ContestCategory = () => {
    // const [xcategory,setxCategory]=useState([]);
    const axiosPublic=useAxiosPublic();
    const categoryUrl='contest/contest_category/category'
    // useEffect(()=>{

    //     axiosPublic.get(categoryUrl)
    //     .then(res=>setxCategory(res.data))
    // },[categoryUrl,axiosPublic])


    const { data: xcategory = [], refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosPublic.get(categoryUrl);
            return res.data;
        }
    })

    return (
        <div>
          
          {
                xcategory.map(cat=>{
                    return(
                        <SingleCategory key={cat} cat={cat}/>
                        // console.log(cat)
                    )
                })
            }
            {/* {console.log(xcategory)} */}
        </div>
    );
};

export default ContestCategory;