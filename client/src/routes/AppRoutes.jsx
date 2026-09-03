import { Routes,Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";
import BrowseUsers from "../Pages/BrowseUsers";
import SwapRequest from "../Pages/SwapRequests";
import NotFound from "../Pages/NotFound";

function AppRoutes()
{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path="/browse" element={<ProtectedRoute><BrowseUsers/></ProtectedRoute>}/>
            <Route path="/requests" element={<ProtectedRoute><SwapRequest/></ProtectedRoute>}/>
            <Route path="*" element={<NotFound/>}/>

           
        </Routes>

    );
}

export default AppRoutes;
