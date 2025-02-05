import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import loginIcon from '../asset/signin.gif'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const regexPatterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    };

    const validateField = (name, value) => {
        switch (name) {
            case "email":
                return regexPatterns.email.test(value) ? "" : "Invalid email format.";
            case "password":
                return regexPatterns.password.test(value)
                    ? ""
                    : "Password must have 8+ chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char.";
            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        Object.keys(data).forEach((field) => {
            const errorMessage = validateField(field, data[field]);
            if (errorMessage) newErrors[field] = errorMessage;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert("Please fix the errors before logging in.");
            return;
        }

        console.log("Login Data:", data);
        alert("Logged in successfully!");
    };

    return (
        <section id="login" className="flex items-center justify-center  bg-gray-100 my-8">
            <div className="bg-white p-6 shadow-lg rounded-2xl w-full max-w-md">
                <img src={loginIcon} alt="Login" className="w-24 h-24 mx-auto" />
                <h2 className="text-xl font-semibold text-center mt-4">Welcome Back</h2>

                <form className="mt-4" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="mb-3">
                        <label className="block text-gray-700 font-medium">Email *</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border rounded-md"
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <label className="block text-gray-700 font-medium">Password *</label>
                        <div className="flex items-center border rounded-md p-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                className="w-full outline-none bg-transparent"
                                onChange={handleChange}
                                required
                            />
                            <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <HiEye /> : <HiEyeOff />}
                            </div>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        <Link to="/forget_password" className="block w-fit ml-auto hover:underline text-sm text-blue-600 mt-1">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="bg-red-600 hover:bg-red-700 text-white py-2 w-full rounded-full mt-4">
                        Login
                    </button>
                </form>

                {/* Sign-up Link */}
                <p className="mt-4 text-center">
                    Don&apos;t have an account?{" "}
                    <Link to="/sign-up" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
