import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";

const DashboardLayout = () => {
    return (
        <div>
            <header className="py-2">
                <Navbar></Navbar>
            </header>
            <main className="min-h-screen bg-slate-200 pb-20">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-5 gap-10 px-2">
                    <div className="col-span-1">
                        <SideNavbar></SideNavbar>
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-lg min-h-screen">
                        <Outlet></Outlet>
                    </div>
                </div>
            </main>
            <footer className="bg-green-300">
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default DashboardLayout;