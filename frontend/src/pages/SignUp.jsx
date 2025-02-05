import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import signupIcon from '../asset/signin.gif'
import { SummaryApi } from "../common/index.js";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    
    const [data, setData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage:null
       
    });

    const regexPatterns = {
        fullName: /^[A-Za-z\s]{3,}$/,
        username: /^[a-zA-Z0-9_]{4,15}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    };

    const validateField = (name, value) => {
        switch (name) {
            case "fullName":
                return regexPatterns.fullName.test(value) ? "" : "Name should be at least 3 characters long.";
            case "username":
                return regexPatterns.username.test(value) ? "" : "Username should be 4-15 characters (letters, numbers, _ allowed).";
            case "email":
                return regexPatterns.email.test(value) ? "" : "Invalid email format.";
            case "password":
                return regexPatterns.password.test(value)
                    ? ""
                    : "Password must have 8+ chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char.";
            case "confirmPassword":
                return value === data.password ? "" : "Passwords do not match.";
            
            default:
                return "";
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setData((data) => ({ ...data, profileImage: reader.result })); // Update the data state with the image URL
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value} = e.target;
        setData({ ...data, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        let newErrors = {};
        Object.keys(data).forEach((field) => {
            const errorMessage = validateField(field, data[field]);
            if (errorMessage) newErrors[field] = errorMessage;
        });


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert("Please fix the errors before submitting.");
            return;
        }

        // Submit the form data to the server...
        console.log("hello");
        const data2=await fetch(SummaryApi.signup.url,{
            method:SummaryApi.signup.method,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const response=await data2.json();
        console.log("hello")
        console.log(response)
    };

    return (
        <section id="sign-up" className="flex items-center justify-center my-8 bg-gray-100">
            <div className="bg-white p-6 shadow-lg rounded-2xl w-full max-w-md">
            <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden border border-gray-300">
                <label className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        name="profileImage"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    <img
                        src={previewImage || signupIcon}
                        alt="signup icon"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full text-center text-xs text-gray-600 bg-white bg-opacity-75 py-1">
                        Change Photo
                    </div>
                </label>
            </div>

                <h2 className="text-xl font-semibold text-center mt-4">Create an Account</h2>

                <form className="mt-4" onSubmit={handleSubmit}>
                    {[
                        { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name" },
                        { label: "Username", name: "username", type: "text", placeholder: "Choose a username" },
                        { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
                    ].map(({ label, name, type, placeholder }) => (
                        <div key={name} className="mb-3">
                            <label className="block text-gray-700 font-medium">{label} *</label>
                            <input
                                type={type}
                                name={name}
                                placeholder={placeholder}
                                value={data[name]}
                                className="w-full p-2 border rounded-md"
                                onChange={handleChange}
                                required
                            />
                            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                        </div>
                    ))}

                    

                    {/* Password Fields */}
                    {[
                        { label: "Password", name: "password", show: showPassword, toggle: setShowPassword },
                        { label: "Confirm Password", name: "confirmPassword", show: showConfirmPassword, toggle: setShowConfirmPassword },
                    ].map(({ label, name, show, toggle }) => (
                        <div key={name} className="mb-3">
                            <label className="block text-gray-700 font-medium">{label} *</label>
                            <div className="flex items-center border rounded-md p-2">
                                <input
                                    type={show ? "text" : "password"}
                                    name={name}
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                    className="w-full outline-none bg-transparent"
                                    onChange={handleChange}
                                    required
                                />
                                <div className="cursor-pointer" onClick={() => toggle(!show)}>
                                    {show ? <HiEye /> : <HiEyeOff />}
                                </div>
                            </div>
                            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                        </div>
                    ))}

                    {/* Submit */}
                    <button type="submit" className="bg-red-600 hover:bg-red-700 text-white py-2 w-full rounded-full mt-4">
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default SignUp;
