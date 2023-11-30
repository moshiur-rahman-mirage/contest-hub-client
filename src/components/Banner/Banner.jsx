
const Banner = () => {
    return (
        <div className="hero min-h-[90vh]" style={{ backgroundImage: 'url(https://i.ibb.co/80GhQbQ/hassan-pasha-7-Sj-Eu-EF06-Zw-unsplash.jpg)' }}>
            {/* <div className="hero-overlay "></div> */}
            <div className="hero-content text-center text-neutral-content">
                <div className='text-white flex items-center flex-col md:space-y-7 md:gap-5 md:pl-12 '>
                    <h2 className='text-5xl font-bold'>Are You Ready?</h2>
                    <div className="md:join md:border">

                        <div>
                            <input className="input input-bordered hover:border-secondary text-neutral-content join-item" placeholder="Search" />
                        </div>

                        <button className="btn md:border md:join-item btn-secondary">Search Contest</button>

                    </div>
                </div>
            </div>
        </div>


    );
};

export default Banner;