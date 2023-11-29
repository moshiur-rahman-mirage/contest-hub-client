
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import SingleContest from "../../components/SingleContest/SingleContest";
import SingleTop from "../../components/SingleTop/SingleTop";

const ContestTab = ({ category }) => {

    return (
        <div >

            <Swiper
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='grid  gap-5 grid-cols-1 md:grid-cols-3'>
                        {
                            category.map(contest => <SingleTop
                                key={contest._id}
                                contest={contest}
                            ></SingleTop>)
                        }
                    </div>

                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default ContestTab;