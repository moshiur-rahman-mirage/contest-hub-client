import Banner from "../../components/Banner/Banner";
import BestCreator from "../../components/BestCreator/BestCreator";
import SingleTopCreator from "../../components/BestCreator/SingleTopCreator";
import ContestCategory from "../../components/ContestCategory/ContestCategory";
import Popular from "../../components/Popular/Popular";
import TopWinners from "../TopWinners/TopWinners";



const Home = () => {
    return (
        <div>
            <Banner />
            <Popular />
            <BestCreator />
            <TopWinners />
        </div>
    );
};

export default Home;