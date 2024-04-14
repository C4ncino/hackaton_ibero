import { createBrowserRouter } from "react-router-dom";
import Diaries from "@pages/diary/Diaries";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Me from "@pages/auth/Me";
import Signup from "@pages/auth/Signup";
import DoctorView from "@pages/doctor/DoctorView";
import About from "@pages/home/About";
import OneDiary from "@pages/diary/subpages/OneDiarie";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/me",
        element: <Me />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/diary",
        element: <Diaries />
    },
    {
        path: "/diary/:id",
        element: <OneDiary />
    },
    {
        path: "/patients",
        element: <DoctorView />
    },
])