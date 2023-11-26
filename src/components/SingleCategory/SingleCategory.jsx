import React from 'react';
import CategoryName from '../../../CategoryName';
import CategoryItems from '../CategoryItems/CategoryItems';


const SingleCategory = ({cat}) => {
    return (
        <div className='flex  md:max-w-7xl mx-auto mb-5  flex-col gap-5'>
            {/* <h1 className='text-neutral-content text-center md:text-left font-bold text-4xl md:text-5xl mb-5'>{name}</h1> */}
            <CategoryName subHeading='' heading={cat} />
           
            <CategoryItems contest_category={cat}/>
           
        </div>
    );
};

export default SingleCategory;