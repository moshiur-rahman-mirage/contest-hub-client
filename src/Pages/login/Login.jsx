
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillGoogleCircle } from "react-icons/ai";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signInUser, brand, signInWithGoogle } = useContext(AuthContext)
    const handleLogin = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')


        signInUser(email, password)
            .then(result => {
                // toast.success('Logged In Successfully!');
                navigate(form ? form : '/');

            })
            .catch(error => {
                console.log(error)
                if (error.code === 'auth/wrong-password') {
                    // toast.error('Please check the Password');
                }
                if (error.code === 'auth/invalid-login-credentials') {
                    // toast.error('Please check the Email');
                }

            })


    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // toast.success('Logged In Successfully!');
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                // toast.error('Error Occured!');
            })
    }
    return (
        <div>
            {/* <HelmetTitle title="Log In"/> */}
            {/* <ToastContainer/> */}
            <section className="">
                <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold ">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                            {/* {brand} */}
                        </h1>
                    </a>
                    <div className="w-full bg-neutral  rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-3 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-neutral-content ">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6 border-neutral-content" onSubmit={handleLogin} >
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-content ">Your email</label>
                                    <input type="email" name="email" id="email" className=" border border-text-neutral-content text-neutral-content  sm:text-sm rounded-lg  block w-full p-2.5  " placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral-content">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-text-neutral-content  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-neutral-content" required="" />
                                </div>
                                <button type="submit" className="w-full text-neutral btn btn-primary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  hover:bg-primary">Sign in</button>
                                <div>
                                    <p className="text-sm font-light text-neutral-content">
                                        Don’t have an account yet? <Link to="/signup" className="font-medium text-neutral-content  hover:underline ">Sign up</Link>
                                    </p>
                                </div>
                                {/* <div className="flex items-center justify-between gap-4">
                                    <p className='text-neutral-content'>Login With Google ?</p>
                                    <button onClick={handleGoogleSignIn} className="btn btn-primary"><AiFillGoogleCircle className="text-3xl bg-primary rounded-lg"></AiFillGoogleCircle></button>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;