import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useContest from '../../hooks/useContest';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import ContestTab from './ContestTab';

const MaterialTabTest = () => {

    const categories = ['Article Writing', 'Business Contest', 'Gaming Contest', 'Medical Contest'];
    //  const { contest_category } = useParams();
     const initialIndex = categories.indexOf('Article Writing');
    const [tabIndex, setTabIndex] = useState(1);
    const [contest] = useContest();

    const article = contest.filter(item => item.contest_category === 'Article Writing');
    const business = contest.filter(item => item.contest_category === 'Business Contest');
    const gaming = contest.filter(item => item.contest_category === 'Gaming Contest');
    const medical = contest.filter(item => item.contest_category === 'Medical Contest');
    // console.log(tabIndex)
    return (
        <Tabs id="custom-animation" value="html" defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabsHeader

                className="bg-transparent"
                indicatorProps={{
                    className: "bg-gray-900/10 shadow-none !text-gray-900",
                }}>
                <Tab>Article Writing</Tab>
                <Tab>Business Contestg</Tab>
                <Tab>Gaming Contest</Tab>
                <Tab>Medical Contest</Tab>
            </TabsHeader>
            <TabsBody
                animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                }}
            >
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
            </TabsBody>
        </Tabs>
    );
};

export default MaterialTabTest;