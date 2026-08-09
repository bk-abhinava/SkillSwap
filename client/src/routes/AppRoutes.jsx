import { Routes,Route } from "react-router-dom";

import Home from "../Pages/Home";
import Login from "../pages/Login";
import Signup from "../Pages/Signup";
import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";
import BrowseUsers from "../pages/BrowseUsers";
import SwapRequest from "../pages/SwapRequests";
import NotFound from "../pages/NotFound";

function AppRoutes()
{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/browse" element={<BrowseUsers/>}/>
            <Route path="/requests" element={<SwapRequest/>}/>
            <Route path="*" element={<NotFound/>}/>

           
        </Routes>

    );
}

export default AppRoutes;