import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import Categories from "./pages/Category/Categories";
import Products from "./pages/Product/Products";
import Projects from "./pages/Project/Projects";
import Sertifications from "./pages/Sertication/Sertifications";
import Partneers from "./pages/Partneer/Partneers";
import Branches from "./pages/Branch/Branches";

const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                {/* index yo'li uchun Home sahifasini ko'rsatamiz */}

                <Route path="/" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/sertifications" element={<Sertifications />} />
                <Route path="/partneers" element={<Partneers />} />
                <Route path="/branches" element={<Branches />} />
            </Route>
        </Routes>
    );
};

export default App;
