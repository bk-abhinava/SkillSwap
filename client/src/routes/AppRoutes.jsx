import { Routes,Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
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
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path="/browse" element={<ProtectedRoute><BrowseUsers/></ProtectedRoute>}/>
            <Route path="/requests" element={<ProtectedRoute><SwapRequest/></ProtectedRoute>}/>
            <Route path="*" element={<NotFound/>}/>

           
        </Routes>

    );
}

export default AppRoutes;