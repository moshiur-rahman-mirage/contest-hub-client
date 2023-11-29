import Banner from "../../components/Banner/Banner";
import ContestCategory from "../../components/ContestCategory/ContestCategory";
import Popular from "../../components/Popular/Popular";


const Home = () => {
    return (
        <div>
            <Banner />
            <Popular />
            <ContestCategory />
        </div>
    );
};

export default Home;