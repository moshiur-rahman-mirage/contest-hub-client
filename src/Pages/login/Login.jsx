import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';





const Login = () => {
    const [disabled, setDisabled] = useState(true)
    const captchaRef = useRef(null)
    const navigate = useNavigate();
    const location=useLocation();


    const from = location.state?.from?.pathname || "/";
  
    const { signInUser, brand, signInWithGoogle } = useContext(AuthContext)



    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')


        signInUser(email, password)
            .then(result => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Logged In Successfully!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from);

            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    Swal.fire({
                        position: "top-end",
                        icon: "eror",
                        title: `Logged In Failed!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (error.code === 'auth/invalid-login-credentials') {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Logged In Failed!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })


    }



    return (
        <div>
           
        
            <section className="bg-[url('/img/login-cover.jpg')] object-cover bg-no-repeat flex items-center h-[600px] ">
                <div className="flex rounded-lg opacity-90 border bg-primary flex-col  text-neutral items-center justify-center px-6 mx-auto  lg:py-0">
                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral  md:text-2xl ">
                                Log in to your account
                            </h1>
                            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" > {/*onSubmit={handleLogin} */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral ">Your Email Address</label>
                                    <input type="email" name="email" id="email" className=" border bg-transparent border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="user@email.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral ">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className=" border bg-transparent border-gray-300 text-neutral sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                </div>

                                <button  type="submit" className="w-full text-neutral btn btn-secondary bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-secondary">Sign in</button>
                                {/* disabled={disabled} */}
                                <div>
                                    <p className="text-sm font-light ">
                                        Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 underline ">Sign up</Link>
                                    </p>
                                </div>
                                <div className='mx-auto flex items-end '>
                                <div className='flex items-end gap-5  flex-row text-3xl '>
                                    Google
                                   Github
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
           
        </div>
    );
};

export default Login;