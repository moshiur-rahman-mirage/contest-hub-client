import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Dashboard from "../layout/Dashboard";
import AddContest from "../Pages/addContest/AddContest";
import SelectWinner from "../Pages/winner/SelectWinner";
import DashboardHome from "../Pages/dashboardHome/DashboardHome";
import AllContest from "../Pages/allContest/AllContest"
import PrivateRoutes from "./PrivateRoutes";
import MyContest from "../Pages/myContest/MyContest";
import ManageContest from "../Pages/ManageContest/ManageContest";
import ContestSubmitted from "../Pages/ContestSubmitted/ContestSubmitted"
import MaterialTabTest from "../Pages/allContest/MaterialTabTest";
import ShowDetails from "../Pages/ShowDetails/ShowDetails";
import Pay from "../Pages/Payment/Pay";
import Users from "../Pages/Users/Users";
import ParticipatedContest from "../Pages/ParticipatedContest/ParticipatedContest";
import AxiosInLoader from "../hooks/AxiosInLoader";
import MaterialTab from "../Pages/MaterialTab/MaterialTab";
import Profile from "../Pages/Profile/Profile";
import ErrorPage from "../ErrorPage";
import WinningContest from "../Pages/WinningContest/WinningContest";



const Router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement:<ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "allcontest",
                element: <AllContest/>
            },
            {
                path: "contest/:id",
                element: <ShowDetails />,
                loader : ({ params }) => fetch(`https://b8a12-server-side-moshiur-rahman-mirage.vercel.app/contest/${params.id}`)
            },
            {
                path: "/payment/contest/:id",
                element: <PrivateRoutes><Pay /></PrivateRoutes>,
                loader : ({ params }) => fetch(`https://b8a12-server-side-moshiur-rahman-mirage.vercel.app/contest/${params.id}`)
            },
            {
                path: "dashboard",
                element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
                children: [
                    {
                        path: "home",
                        element: <PrivateRoutes><DashboardHome /></PrivateRoutes>
                    },
                    {
                        path: "addcontest",
                        element: <PrivateRoutes><AddContest /></PrivateRoutes>
                    },
                    {
                        path: "mycontest",
                        element: <PrivateRoutes><MyContest /></PrivateRoutes>
                    },
                    {
                        path: "managecontest",
                        element: <PrivateRoutes><ManageContest /></PrivateRoutes>
                    },
                    {
                        path: "winner",
                        element: <SelectWinner />
                    },
                    {
                        path: "users",
                        element: <PrivateRoutes><Users/></PrivateRoutes>
                    },
                    {
                        path: "profile",
                        element: <PrivateRoutes><Profile/></PrivateRoutes>
                    },
                    {
                        path: "participated/",
                        element: <PrivateRoutes><ParticipatedContest/></PrivateRoutes>,
                        // loader: ({ params }) => fetch(`https://b8a12-server-side-moshiur-rahman-mirage.vercel.app/submission/participated-contests/${params.userId}`),
                      
                    },
                    {
                        path: "winning",
                        element: <PrivateRoutes><WinningContest/></PrivateRoutes>,
                        // loader: ({ params }) => fetch(`https://b8a12-server-side-moshiur-rahman-mirage.vercel.app/submission/participated-contests/${params.userId}`),
                      
                    },
                    {
                        path: "contestsubmitted/:id",
                        element: <PrivateRoutes><ContestSubmitted /></PrivateRoutes>,
                        loader: ({ params }) => fetch(`https://b8a12-server-side-moshiur-rahman-mirage.vercel.app/submission/contest-users-inner-join/${params.id}`),
                    },
                ]
            },
        ]
    },
]);

export default Router;