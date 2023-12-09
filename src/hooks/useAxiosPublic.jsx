import axios from "axios";


const axiosPublic=axios.create({
   baseURL:'https://contest-hub-server-bice.vercel.app',
    withCredentials:false
})

const useAxiosPublic=()=>{
    return axiosPublic;
}

export default useAxiosPublic;