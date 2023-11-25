import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Dashboard from "../layout/Dashboard";
import AddContest from "../Pages/addContest/AddContest";
import SelectWinner from "../Pages/winner/SelectWinner";
import DashboardHome from "../Pages/dashboardHome/DashboardHome";
import Dr from "../layout/Dr";
import PrivateRoutes from "./PrivateRoutes";
import MyContest from "../Pages/myContest/MyContest";
import ManageContest from "../Pages/ManageContest/ManageContest";
import ContestSubmitted from "../Pages/ContestSubmitted/ContestSubmitted"



const Router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
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
                path: "dr",
                element: <Dr />
            },
            {
                path: "contestsubmitted/:id",
                element: <PrivateRoutes><ContestSubmitted /></PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/submisstion/contest/${params.id}`),
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "home",
                        element: <DashboardHome />
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
                    }
                ]
            },
        ]
    },
]);

export default Router;