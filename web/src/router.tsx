import { createBrowserRouter } from "react-router-dom";
import Diaries from "@pages/diary/Diaries";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Me from "@pages/auth/Me";
import Signup from "@pages/auth/Signup";
import DoctorView from "@pages/doctor/DoctorView";
import About from "@pages/home/About";
import OneDiary from "@pages/diary/subpages/OneDiarie";
import AddDoctor from "@pages/patient/AddDoctor";
import Patient from "@pages/doctor/subpages/Patient";
import CreateDiary from "@pages/doctor/subpages/Create";
import ReadDiary from "@pages/doctor/subpages/ReadDiary";
import Questions from "@pages/doctor/subpages/Questions";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login/:invite?",
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
    {
        path: "/patients/:id",
        element: <Patient />
    },
    {
        path: "/read/:idUser/:idDiary",
        element: <ReadDiary />
    },
    {
        path: "create_diary/:idUser",
        element: <CreateDiary />
    },
    {
        path: "/subpages",
        element: <Questions />
    },
    {
        path: "/addDoctor/:idDoctor",
        element: <AddDoctor />
    },
])