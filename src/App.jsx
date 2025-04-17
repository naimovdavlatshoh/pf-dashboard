import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import Categories from "./pages/Category/Categories";
import Products from "./pages/Product/Products";
import Projects from "./pages/Project/Projects";
import Sertifications from "./pages/Sertication/Sertifications";
import Partneers from "./pages/Partneer/Partneers";
import Branches from "./pages/Branch/Branches";
import Login from "./pages/Auth/Login";

const App = () => {
    const navigate = useNavigate();

    // Axios sozlamalari
    const axiosInstance = axios.create({
        baseURL: "https://pro-filter.ibosh-dev.uz/api", // ← bu yerni o'zgartiring
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Request interceptor - token qo‘shish
    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Response interceptor - 401 error tutish
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                toast.error("Пожалуйста, войдите снова");
                localStorage.removeItem("token");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
            return Promise.reject(error);
        }
    );

    // Test uchun: bu yerda bir marta mahsulotlarni olib ko‘rish
    useEffect(() => {
        axiosInstance
            .get("/category/for/admin/")
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="/" element={<Categories />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route
                        path="/sertifications"
                        element={<Sertifications />}
                    />
                    <Route path="/partneers" element={<Partneers />} />
                    <Route path="/branches" element={<Branches />} />
                </Route>
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default App;
