import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Signup()
{

    const navigate = useNavigate();
    //DATA TEMPLETE
   const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    
   });
   //ERRORS 
   const [errors,setErrors]=useState({});
   const [apiError, setApiError] = useState("");

   const handleChange=(event)=> {
    const{name,value}=event.target;

    setFormData({
        ...formData,
        [name]:value,
    });
   };

   const validateForm = () => {
  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!formData.email.includes("@")) {
    newErrors.email = "Enter a valid email";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  return newErrors;
};
//HANDEL SUBMIT
const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = validateForm();

  setErrors(validationErrors);
  setApiError("");

  if (Object.keys(validationErrors).length > 0) {
    return;
  }

  try {
    const data = await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

   

    navigate("/login");

  } catch (error) {
    console.error("Registration error:", error.message);

    setApiError(error.message);
  }
};

   return(
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px6 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-blue-600">
                    SkillSwap
                </h1>
                <h2 className="text-2xl font-bold mt-6">
                    Create your account
                </h2>
                <p className="text-gray-500 mt-2">
                    Start learning and sharing your skills.
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                {apiError && (
  <p className="text-red-500 text-sm mb-4">
    {apiError}
  </p>
)}
                <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                    Name
                </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name}
                    </p>
                )}
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-medium mb-2">
                        Email
                    </label>
                    <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
        
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                     {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                    </p>
                )}

                </div>
                <div className="mb-5">
                    <label className="block text-sm font-medium mb-2">
                        Password
                    </label>
                    <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
        
                    placeholder="Create a password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                     {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </p>
                )}
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        Confirm Password
                    </label>
                    <input 
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
        
                    placeholder="Confirm your password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                     {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                    </p>
                )}
                </div>
                <button type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Create Account
                </button>

            </form>
        </div>
    </div>
   )


}

export default Signup;