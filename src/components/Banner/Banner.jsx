
const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(/public/banner2.jpg)' }}>
            {/* <div className="hero-overlay "></div> */}
            <div className="hero-content text-center text-neutral-content">
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


    );
};

export default Banner;