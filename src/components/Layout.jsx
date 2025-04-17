import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import {
    Barcode,
    ChartBarStacked,
    CircleFadingArrowUp,
    FolderKanban,
    Handshake,
    Home,
    LogOut,
    ShieldCheck,
    Split,
    StepBack,
    User,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const currentUrl = useLocation().pathname;
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-white text-gray-800">
            {/* Sidebar */}
            <div
                className={`transition-all duration-300 bg-[#0F172A] text-white ${
                    isSidebarOpen ? "w-64" : "w-20"
                } flex flex-col justify-between rounded-2xl m-2 shadow-lg`}
            >
                <div className="p-4">
                    <div
                        className={`text-2xl font-bold mb-6 flex items-center justify-${
                            isSidebarOpen ? "between" : "center"
                        }`}
                    >
                        {isSidebarOpen ? (
                            <p>Pro-filter</p>
                        ) : (
                            <p
                                className="cursor-pointer"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                PF
                            </p>
                        )}
                        {isSidebarOpen && (
                            <StepBack
                                className="cursor-pointer"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            />
                        )}
                    </div>
                    <div className="space-y-4">
                        <Link
                            to="/"
                            variant="text"
                            className={`${
                                currentUrl == "/" ? "bg-white text-black" : ""
                            } flex items-center gap-2 hover:bg-white hover:text-black p-3 rounded-xl`}
                        >
                            <ChartBarStacked />
                            {isSidebarOpen && <span>Категории</span>}
                        </Link>
                        <Link
                            to="/products"
                            variant="text"
                            className={`${
                                currentUrl == "/products"
                                    ? "bg-white text-black"
                                    : ""
                            } flex items-center gap-2 hover:bg-white hover:text-black p-3 rounded-xl`}
                        >
                            <Barcode />
                            {isSidebarOpen && <span>Продукты</span>}
                        </Link>
                        <Link
                            to="/projects"
                            variant="text"
                            className={`${
                                currentUrl == "/projects"
                                    ? "bg-white text-black"
                                    : ""
                            } flex items-center gap-2 hover:bg-white hover:text-black p-3 rounded-xl`}
                        >
                            <FolderKanban />
                            {isSidebarOpen && <span>Проекты</span>}
                        </Link>
                        <Link
                            to="/sertifications"
                            variant="text"
                            className={`${
                                currentUrl == "/sertifications"
                                    ? "bg-white text-black"
                                    : ""
                            } flex items-center gap-2 hover:bg-white hover:text-black p-3 rounded-xl`}
                        >
                            <ShieldCheck />
                            {isSidebarOpen && <span>Сертификаты</span>}
                        </Link>
                        <Link
                            to="/partneers"
                            variant="text"
                            className={`${
                                currentUrl == "/partneers"
                                    ? "bg-white text-black"
                                    : ""
                            } flex items-center gap-2 hover:bg-white hover:text-black p-3 rounded-xl`}
                        >
                            <Handshake />
                            {isSidebarOpen && <span>Партнеры</span>}
                        </Link>
                        <Link
                            to="/branches"
                            variant="text"
                            className={`${
                                currentUrl == "/branches"
                                    ? "bg-white text-black"
                                    : ""
                            } flex items-center gap-2 hover:bg-white hover:text-black p-3 rounded-xl`}
                        >
                            <Split />
                            {isSidebarOpen && <span>Флиалы</span>}
                        </Link>
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-4">
                    <button
                        onClick={() => {
                            navigate("/login"), localStorage.clear();
                        }}
                        variant="text"
                        className={` flex items-center gap-2 hover:bg-white hover:text-black p-3 rounded-xl`}
                    >
                        <LogOut />
                        {isSidebarOpen && <span>Выход из системы</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100 rounded-2xl m-2  overflow-y-scroll">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
