import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import AllPropertiesPage from "../pages/AllPropertiesPage";
import PrivateRoute from "./PrivateRoute";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";
import DashboardLayout from "../layouts/DashboardLayout";
import ProfilePage from "../pages/dashboard/ProfilePage";
import WishlistPage from "../pages/dashboard/WishlistPage";
import PropertyBoughtPage from "../pages/dashboard/PropertyBoughtPage";
import MyReviews from "../pages/dashboard/MyReviews";
import MakeOfferPage from "../pages/dashboard/MakeOfferPage";
import AgentRoute from "./AgentRoute";
import AddPropertyPage from "../pages/dashboard/AddPropertyPage";
import MyAddedPropertiesPage from "../pages/dashboard/MyAddedPropertiesPage";
import MySoldPropertiesPage from "../pages/dashboard/MySoldPropertiesPage";
import RequestedPropertiesPage from "../pages/dashboard/RequestedPropertiesPage";
import UpdatePropertyPage from "../pages/dashboard/UpdatePropertyPage";
import PaymentPage from "../pages/dashboard/PaymentPage";

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
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'profile',
                element: <ProfilePage></ProfilePage>
            },
            {
                path: 'wishlists',
                element: <WishlistPage></WishlistPage>
            },
            {
                path: 'property-bought',
                element: <PropertyBoughtPage></PropertyBoughtPage>
            },
            {
                path: 'my-reviews',
                element: <MyReviews></MyReviews>
            },
            {
                path: 'offer-price/:propertyId',
                element: <MakeOfferPage></MakeOfferPage>
            },
            {
                path: 'add-property',
                element: <AgentRoute><AddPropertyPage></AddPropertyPage></AgentRoute>
            },
            {
                path: 'my-added-properties',
                element: <AgentRoute><MyAddedPropertiesPage></MyAddedPropertiesPage></AgentRoute>
            },
            {
                path: 'my-sold-properties',
                element: <AgentRoute><MySoldPropertiesPage></MySoldPropertiesPage></AgentRoute>
            },
            {
                path: 'requested-properties',
                element: <AgentRoute><RequestedPropertiesPage></RequestedPropertiesPage></AgentRoute>
            },
            {
                path: 'update-property/:propertyId',
                element: <AgentRoute><UpdatePropertyPage></UpdatePropertyPage></AgentRoute>
            },
            {
                path: 'payment/:offerId',
                element: <PaymentPage></PaymentPage>
            },
        ]
    }
])

export default router;