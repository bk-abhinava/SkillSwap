import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";


function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    //setting form
    const [formData, setFormData] = useState(
        {
            email: "",
            password: "",
        }
    );
    //setting errors
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    //handling errors
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(
            {
                ...formData,
                [name]: value,
            });
    };

    /// form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";

        }
        else if (!formData.email.includes("@")) {
            newErrors.email = "Enter a valid email";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        return newErrors;
    };

    //submitting

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm();

        setErrors(validationErrors);
        setServerError("");

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const data = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashboard");

        } catch (error) {
            setServerError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="text-center mb-8">

                    <Link to="/"
                        className="text-3xl font-bold text-blue-600">
                        SkillSwap</Link>
                    <h1 className="text-2xl font-bold mt-6">
                        Welcome back</h1>
                    <p className="text-gray-500 mt-2">
                        Login to continue learning and sharing</p>


                </div>
                {serverError && (
                    <p className="text-red-500 text-sm mt-4">
                        {serverError}
                    </p>
                )}
                <form onSubmit={handleSubmit}>

                    <div className="mb-5">
                        <label className="block text-sm font-medium  mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>




                </form>

                <p className="text-center text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>

    );






}

export default Login;