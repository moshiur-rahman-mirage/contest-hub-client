import { useState } from "react";
import { useParams } from "react-router-dom";
import useContest from "../../hooks/useContest";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ContestTab from "./ContestTab";

// import './../allContest/tabstyle.css';
import 'react-tabs/style/react-tabs.css'
const AllContest = () => {
    const categories = ['Article Writing', 'Business Contest', 'Gaming Contest', 'Medical Contest'];
    const { contest_category } = useParams();
    const initialIndex = categories.indexOf('Article Writing');
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [contest] = useContest();

    const article = contest.filter(item => item.contest_category === 'Article Writing');
    const business = contest.filter(item => item.contest_category === 'Business Contest');
    const gaming = contest.filter(item => item.contest_category === 'Gaming Contest');
    const medical = contest.filter(item => item.contest_category === 'Medical Contest');

    return (
        <div className="max-w-7xl my-10 mx-auto">
            <div className="grid  w-full place-items-center text-2xl py-5">All Contests By Category</div>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Article Writing</Tab>
                    <Tab>Business Contest</Tab>
                    <Tab>Gaming Contest</Tab>
                    <Tab>Medical Contest</Tab>
                </TabList>
                <TabPanel>
                    <ContestTab category={article}></ContestTab>
                </TabPanel>
                <TabPanel>
                    <ContestTab category={business}></ContestTab>
                </TabPanel>
                <TabPanel>
                    <ContestTab category={gaming}></ContestTab>
                </TabPanel>
                <TabPanel>
                    <ContestTab category={medical}></ContestTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default AllContest;