

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useContest = () => {
    const axiosPublic = useAxiosPublic();
    const {data: contest = [], isPending: loading, refetch} = useQuery({
        queryKey: ['contest'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/contest?contest_status=Accepted');
            return res.data;
        }
    })


    return [contest, loading, refetch]
}

export default useContest;