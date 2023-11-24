import React, { useContext, useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';


const AddContest = () => {

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();
    const {user}=useContext(AuthContext)
    console.log(user)
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=ffb0b38d5ef00b42e67cbd94cc6f2192`;
   
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data)
        if (res.data.success) {
            const contest = {
                contest_name: data.contest_name,
                contest_description: data.contest_description,
                contest_prize: data.contest_prize,
                contest_deadline: data.contest_deadline,
                contest_image: res.data.data.display_url,
                contest_creator:user.email
            }

            const contest_res = await axiosSecure.post('/contest', contest);
            if (contest_res.data.insertedId) {

                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.contest_name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    };


    return (
        <div>
            <SectionTitle title="Contest Home" />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:max-w-lg max-w-min">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full  px-3 md:mb-2 mb-0">
                        <label className="block uppercase tracking-wide text-neutral-content text-xs font-bold md:mb-2 mb-0" htmlFor="grid-first-name">
                            Contest Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-neutral-content border border-red-500 rounded py-3 px-4 md:mb-3 mb-0 leading-tight focus:outline-none focus:bg-white"
                            id="contest_name"
                            type="text"
                            {...register('contest_name', { required: true })}
                            placeholder="Contest Name" />
                    </div>
                    <div className="w-full  px-3 md:mb-2 mb-0">
                        <label className="block uppercase tracking-wide text-neutral-content text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Description
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-neutral-content border border-red-500 rounded py-3 px-4 md:mb-3 mb-0 leading-tight focus:outline-none focus:bg-white"
                            id="contest_description"
                            {...register('contest_description', { required: true })}
                            type="text"
                            placeholder="Description" />
                    </div>

                    <div className="w-full md:w-1/2 px-3 md:mb-2 mb-0">
                        <label className="block uppercase tracking-wide text-neutral-content text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Prize
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-neutral-content border border-red-500 rounded py-3 px-4 md:mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="contest_prize"
                            {...register('contest_prize', { required: true })}
                            type="text" placeholder="Prize" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 md:mb-2 mb-0">
                        <label className="block uppercase tracking-wide text-neutral-content text-xs font-bold md:mb-2" htmlFor="grid-first-name">
                            Deadline
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-neutral-content border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            {...register('contest_deadline', { required: true })}
                            id="pname" type="date" />
                    </div>

                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-neutral-content text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Image
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-neutral-content border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="image"
                            {...register('image', { required: true })}
                            type="file" />
                    </div>


                </div>
                <div>
                    <button type="submit" className="mt-3 w-full btn btn-outline  hover:bg-primary-700 focus:ring-4">Submit</button>

                </div>
            </form>
        </div>
    );
};

export default AddContest;