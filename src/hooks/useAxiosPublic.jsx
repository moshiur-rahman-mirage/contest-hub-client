import axios from "axios";


const axiosPublic=axios.create({
   baseURL:'https://b8a12-server-side-moshiur-rahman-mirage.vercel.app',
    withCredentials:false
})

const useAxiosPublic=()=>{
    return axiosPublic;
}

export default useAxiosPublic;