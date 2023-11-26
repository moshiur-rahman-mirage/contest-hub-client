import React, { useState } from 'react';
// import SingleCategory from './SingleCategory';

import { useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SingleCategory from '../SingleCategory/SingleCategory';

const ContestCategory = () => {
    const [xcategory,setxCategory]=useState([]);
    const axiosPublic=useAxiosPublic();
    const categoryUrl='contest/contest_category/category'
    useEffect(()=>{

        axiosPublic.get(categoryUrl)
        .then(res=>setxCategory(res.data))
    },[categoryUrl,axiosPublic])

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