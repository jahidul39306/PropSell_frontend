import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import AllPropertiesPage from "../pages/AllPropertiesPage";
import PrivateRoute from "./PrivateRoute";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: "/login",
                element: <LoginPage></LoginPage>
            },
            {
                path: "/registration",
                element: <RegistrationPage></RegistrationPage>
            },
            {
                path: "/all-properties",
                element: <PrivateRoute><AllPropertiesPage></AllPropertiesPage></PrivateRoute>
            },
            {
                path: "/property/:id",
                element: <PrivateRoute><PropertyDetailsPage></PropertyDetailsPage></PrivateRoute>
            },
        ]
    }
])

export default router;