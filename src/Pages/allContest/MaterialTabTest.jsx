import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import { useState } from "react";
import useContest from "../../hooks/useContest";
   
  export function MaterialTabTest() {
    const categories = ['Article Writing', 'Business Contest', 'Gaming Contest', 'Medical Contest'];
    const [currentCategory,setCurrentCategory]=useState('');
    // console.log(currentCategory)
    const [contest] = useContest();
    const contestData = contest.filter(item => item.contest_category === currentCategory);
   
    const handleTabChange = (index) => {
        setCurrentCategory(index);
      };

    return (
      <Tabs value="html" className=" max-w-7xl mx-auto"  onChange={handleTabChange}>
        <TabsHeader className="">
          {categories.map((category) => (
            <Tab key={category} value={category} className="h-[50px]" >
              {category}
            </Tab>
          ))}
        </TabsHeader>
        {/* <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody> */}
      </Tabs>
    );
  }


  export default MaterialTabTest;