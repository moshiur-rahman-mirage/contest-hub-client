import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SingleContest from "../SingleContest/SingleContest";



const CategoryItems = ({ contest_category }) => {
    const [contests, setContests] = useState([]);
    const { loading } = useContext(AuthContext);
    const axiosPublic=useAxiosPublic();

    const categoryUrl=`/contest?contest_category=${contest_category}&size=4`
    // console.log(categoryUrl)
    useEffect(() => {
        axiosPublic.get(categoryUrl)
        .then(res=>setContests(res.data))
    }, [categoryUrl,axiosPublic])


    return (
        <div className='border'>
        <div className='grid  gap-5 grid-cols-1 md:grid-cols-4 '>
             {
                contests.map(contest=>{
                    return(
                        <SingleContest key={contest._id} contest={contest}/>
                    )
                })
            }
           
           </div>

               
           
            
        </div>
    );
};

export default CategoryItems;