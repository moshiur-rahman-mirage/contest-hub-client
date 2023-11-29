
import useAxiosSecure from './useAxiosSecure';


const AxiosInLoader = ({ params }) => {
    const axiosSecure = useAxiosSecure();
    const fetchData = async () => {
        try {
            const response = await axiosSecure.get({ params })
            console.log(response)
            return response.data;
        }
        catch (error) {
            console.log('Error', error)
        }
    }
    return fetchData;
};

export default AxiosInLoader;