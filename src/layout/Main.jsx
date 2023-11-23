import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import { CssBaseline } from "@mui/material";


const Main = () => {
    return (
      <div>
          <CssBaseline />
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    );
};

export default Main;