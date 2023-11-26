
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import SingleContest from "../../components/SingleContest/SingleContest";

const ContestTab = ({ category }) => {
    // const pagination = {
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //         return '<span class="' + className + '">' + (index + 1) + "</span>";
    //     },
    // };
    return (
        <div >

            <Swiper
                // pagination={pagination}
                // modules={[Pagination]}  
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='grid  gap-5 grid-cols-1 md:grid-cols-4'>
                        {
                            category.map(contest => <SingleContest
                                key={contest._id}
                                contest={contest}
                            ></SingleContest>)
                        }
                    </div>

                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default ContestTab;