import React, { useContext } from 'react';


import { Link, useNavigate } from 'react-router-dom';


import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const Profile = () => {
    const { user, createUser, brand, logout, updateUserProfile } = useContext(AuthContext)
    
    const userUrl = `/users/${user.email}`
    console.log(userUrl)
    const { data: myUserProfile = [], refetch } = useQuery({
        queryKey: ['myUserProfile'],
        queryFn: async () => {
            const res = await axiosSecure.get(userUrl);
            return res.data;
        }
    })

console.log()
 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = (data) => {
        updateUserProfile(data.name, data.photoUrl).
            then(() => {
                console.log('firebase done')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

            })
            .then(result => {
                const userInfo = {
                    name: data.name,
                    img: data.photoUrl
                }
                axiosSecure.put(`/users/${myUserProfile[0]._id}`, userInfo)
                    .then(res => {
                        console.log(userInfo)
                        console.log(res)
                        Swal.fire({
                            title: "Done!",
                            text: `User has been Updated.`,
                            icon: "success"
                          });

                    })
            })

    }

    return (
        <div>

            <h1 className='text-4xl grid place-items-center mt-10'>Update Profile</h1>

            <div className="flex  rounded-lg opacity-90  flex-col  text-neutral items-center justify-center mx-auto  lg:py-0">
                <div className="space-y-2 w-1/2 md:space-y-6 sm:p-8">

                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>

                            <input type="text" {...register("name")} name="name" id="name" className=" border bg-transparent text-neutral-content border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Your Name" required="" />
                        </div>
                        <div>

                            <input type="photoUrl" {...register("photoUrl")} name="photoUrl" id="photoUrl" className=" text-neutral-content border bg-transparent border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Photo URL" required="" />
                        </div>

                        <button type="submit" className="w-full btn btn-ghost bg-secondary text-neutral-content hover:bg-accent hover:text-neutral focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Profile</button>

                    </form>
                </div>

            </div>


        </div>
    );
};

export default Profile;