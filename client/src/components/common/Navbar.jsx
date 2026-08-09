import { Link } from "react-router-dom";

function Navbar()
{
    return (<nav className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">
               <Link to="/">SkillSwap</Link> 
            </h1>
            <ul className="flex gap-8">
                <Link to="/">Home</Link>
                <Link to="">Browse</Link>
                <Link to="">About</Link>

            </ul>
            <div className="flex gap-4">
                <button><Link to="login">Login</Link></button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                   <Link to="signup">Get Started</Link>  
                </button>
            </div>
            </div></nav>
        );
}

export default Navbar;