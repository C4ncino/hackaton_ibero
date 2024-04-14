import DiaryNotes from "@pages/start/DiaryNotes";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Me from "@pages/auth/Me";
import Signup from "@pages/auth/Signup";
import { createBrowserRouter } from "react-router-dom";
import DoctorView from "@pages/doctor/DoctorView";
import About from "@pages/diary/About";

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
        path: "/diary",
        element: <About />
    },
    {
        path: "/start",
        element: <DiaryNotes />
    },
    {
        path: "/patients",
        element: <DoctorView />
    },
])