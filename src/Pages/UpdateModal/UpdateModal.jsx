import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const UpdateModal = ({ isOpen, closeModal, selectedData }) => {
    const { register, handleSubmit, reset } = useForm();
    console.log(selectedData)
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const onSubmit = async (data) => {
        console.log('update called')
        // const imageFile = { image: data.image[0] }
        // // const res = await axiosPublic.post(image_hosting_api, imageFile, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // });
        // // if (res.data.success) {
        const contest = {
            contest_name: data.contest_name,
            contest_description: data.contest_description,
            contest_prize: data.contest_prize,
            contest_deadline: data.contest_deadline,
            // contest_image: res.data.data.display_url,
            contest_category: data.contest_category,
            // contest_creator: user.email,
            contest_price: data.contest_price,
            contest_instruction: data.contest_instruction
        }

        const contest_res = await axiosSecure.put(`/contest/${selectedData._id}`, contest);
         console.log(contest)
        if (contest_res.data._id) {

            console.log('here swal')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.contest_name} is added as Contest.`,
                showConfirmButton: false,
                timer: 1500
            });
            reset();
        }
        else {
            console.log('not uploaded')
        }
        // }
        // console.log('with image url', res.data);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            // style={customStyles}
            contentLabel="Example Modal"
        >
            <h2>Data Details</h2>
            {selectedData && (
                <div className='max-w-6xl '>
                    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto  w-full md:max-w-lg max-w-min">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full  px-3 md:mb-2 mb-0">
                                <label className="block uppercase tracking-wide text-neutral-content text-xs font-bold md:mb-2 mb-0" htmlFor="grid-first-name">
                                    Contest Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-neutral-content border border-red-500 rounded py-3 px-4 md:mb-3 mb-0 leading-tight focus:outline-none focus:bg-white"
                                    id="contest_name"
                                    type="text"
                                    defaultValue={selectedData.contest_name}
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
                                    defaultValue={selectedData.contest_description}
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
                                    defaultValue={selectedData.contest_prize}
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
                                    defaultValue={selectedData.contest_deadline}
                                    id="pname" type="date" />
                            </div>

                            <div className="w-full md:w-1/2 px-3 md:mb-2 mb-0">
                                <label className="block uppercase tracking-wide text-neutral-content text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Contest Price
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-neutral-content border border-red-500 rounded py-3 px-4 md:mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="contest_price"
                                    {...register('contest_price', { required: true })}
                                    defaultValue={selectedData.contest_price}
                                    type="text" placeholder="Price" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 md:mb-2 mb-0">
                                <label className="block uppercase tracking-wide text-neutral-content text-xs font-bold md:mb-2" htmlFor="grid-first-name">
                                    Category
                                </label>
                                <select defaultValue="selectedData.contest_category" {...register('contest_category', { required: true })}
                                    className="select text-neutral-content select-bordered w-full">
                                    <option className='text-neutral-content'></option>
                                    <option className='text-neutral-content'>Business Contest</option>
                                    <option className='text-neutral-content'>Medical Contest</option>
                                    <option className='text-neutral-content'>Article Writing</option>
                                    <option className='text-neutral-content'>Gaming</option>

                                </select>
                            </div>

                            <div className="w-full  px-3 md:mb-2 mb-0">
                                <label className="block uppercase tracking-wide text-neutral-content text-xs font-bold md:mb-2 mb-0" htmlFor="grid-first-name">
                                    Instruction
                                </label>
                                <textarea
                                    className="appearance-none textarea textarea-bordered block w-full bg-gray-200 text-neutral-content border border-red-500 rounded py-3 px-4 md:mb-3 mb-0 leading-tight focus:outline-none focus:bg-white"
                                    id="contest_instruction"
                                    type="text"
                                    {...register('contest_instruction', { required: true })}
                                    placeholder="contest instruction" />
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
            )}
            <button onClick={closeModal}>Close Modal</button>
        </Modal>
    );
};

export default UpdateModal;