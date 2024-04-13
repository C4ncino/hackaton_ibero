import DiaryNotes from "@pages/diary/DiaryNotes";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Me from "@pages/auth/Me";
import Signup from "@pages/auth/Signup";
import { createBrowserRouter } from "react-router-dom";

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
        element: <DiaryNotes />
    },
])