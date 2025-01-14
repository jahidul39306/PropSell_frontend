import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <div>
            <header className="py-2">
                <Navbar></Navbar>
            </header>
            <main className="min-h-screen bg-slate-200">
                <Outlet></Outlet>
            </main>
            <footer className="bg-green-300 mt-20">
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;