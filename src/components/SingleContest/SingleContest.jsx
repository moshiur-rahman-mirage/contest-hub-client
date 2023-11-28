import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { format } from 'date-fns';

const SingleContest = ({ contest }) => {
    const navigate = useNavigate()
    const location = useLocation();
    const user = useAuth();
    // const [refetch,] = useCart();
    const axiosPublic = useAxiosPublic();

    const { _id, contest_name, contest_creator, contest_description, contest_image, contest_deadline, contest_prize, contest_price } = contest

    return (
     


            <div>
                <img
                    alt="Art"
                    src={''}
                    className="h-64   p-2 md:w-full  object-cover sm:h-80 lg:h-96"
                />


                <div className='flex object-contain flex-row break-words items-end md:items-start md:flex-col'>
                    <div >
                        <h3 className="mt-2 pl-2 w-72 break-words  text-lg font-bold text-neutral-content sm:text-xl">
                            {contest_name}
                        </h3>
                        <p className=" pl-2 max-w-sm text-neutral-content">
                            {contest_prize}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 md:pl-2  max-w-sm text-neutral-content">
                            Deadline: {contest_deadline}
                        </p>
                    </div>
                    <Link to={`/contest/${_id}`} className='btn btn-secondary'>Show Details</Link>
                </div>
               




            </div>

   
    );
};

export default SingleContest;