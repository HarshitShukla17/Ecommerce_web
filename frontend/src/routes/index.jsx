import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forget_Password from "../pages/Forget_Password";
import SignUp from "../pages/SignUp";
 // Importing createBrowserRouter from react-router-dom


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/", // The path for the Home page
                element: <Home /> // The Home component
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"forget_password",
                element:<Forget_Password/>
            },
            {
                path: "sign-up",
                element:<SignUp/>
            }
        ]
    }
]);
export default router;

// Creating a router using createBrowserRouter