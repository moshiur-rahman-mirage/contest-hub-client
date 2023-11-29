
const Banner = () => {
    return (
        <div className="carousel w-full h-[600px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="/public/banne8r2.jpg" className="w-full  " />
                <div className="absolute  flex items-center h-full left-0 md:left-1/3 top-0 md:bg-gradient-to-r md:from-transparent to-transparent  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    {/*  */}
                    <div className='text-white flex items-center flex-col space-y-7 md:gap-5 pl-12 '>
                        <h2 className='text-5xl font-bold'>Are You Ready?</h2>
                        <div className="join border">

                            <div>
                                <input className="input input-bordered hover:border-secondary text-neutral-content join-item" placeholder="Search" />
                            </div>

                            <button className="btn border join-item btn-secondary">Search Contest</button>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Banner;