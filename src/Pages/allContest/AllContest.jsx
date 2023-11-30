import { useState } from "react";
import { useParams } from "react-router-dom";
import useContest from "../../hooks/useContest";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ContestTab from "./ContestTab";

// import './../allContest/tabstyle.css';
import 'react-tabs/style/react-tabs.css'
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import { useEffect } from "react";
const AllContest = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const categories = ['Article Writing', 'Business Contest', 'Gaming Contest', 'Medical Contest'];
    const { contest_category } = useParams();
    const initialIndex = categories.indexOf('Article Writing');
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [contest,setContest]=useState([])
    console.log(tabIndex)
    const [tabName, setTabName] = useState('Article Writing');
    const axiosPublic = useAxiosPublic();
     const [count, setCount] = useState(0)

   

useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosPublic.get(`/contest/categorycount/count?contest_category=${tabName}`)
            setCount(response.data);
          } catch (error) {
           console.log(error)
          }
        };
        fetchData(); 
        return () => {
          
        };
      }, [tabName,axiosPublic]);




      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosPublic.get(`/contest?getcontest/page&category=${tabName}&page=${currentPage}&size=${itemsPerPage}`);
            setContest(response.data);
          } catch (error) {
           console.log(error)
          }
        };
        fetchData(); 
        return () => {
          
        };
      }, [currentPage,itemsPerPage,axiosPublic,tabName]);


  
console.log('66666666666')
    const numberOfPages = Math.ceil(count / itemsPerPage);
console.log(count)
console.log(itemsPerPage)

        
        const article = contest.filter(item => item.contest_category === 'Article Writing');
        const business = contest.filter(item => item.contest_category === 'Business Contest');
        const gaming = contest.filter(item => item.contest_category === 'Gaming Contest');
        const medical = contest.filter(item => item.contest_category === 'Medical Contest');


    const pages = [...Array(numberOfPages).keys()];
    const handleTabSelect = (index) => {
        setTabIndex(index);
        setTabName(getTabNameByIndex(index))
    };

    const getTabNameByIndex = (index) => {
        const tabNames = ['Article Writing', 'Business Contest', 'Gaming Contest', 'Medical Contest'];
        return tabNames[index];
    };


    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    console.log(tabName)


    return (
        <div className="max-w-7xl my-10 mx-auto">
            <div className="grid  w-full place-items-center text-2xl py-5">All Contests By Category</div>
            <Tabs defaultIndex={tabIndex} onSelect={handleTabSelect}>
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
            <div className='pagination'>
                <p>Current page: {currentPage}</p>
                <button onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page => <button
                        className={currentPage === page ? 'selected' : undefined}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>)
                }
                <button onClick={handleNextPage}>Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default AllContest;