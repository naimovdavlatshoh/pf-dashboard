import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { AddCategory } from "./AddCategory";
import { EditCategory } from "./EditCategory";
import { DeleteContainer } from "../../components/DeleteContainer";

const CategoryList = () => {
    const [categories] = useState([
        { id: 1, name: "Sport", description: "Sportga oid yangiliklar" },
        {
            id: 2,
            name: "Texnologiya",
            description: "Texnologiyaga oid yangiliklar",
        },
        { id: 3, name: "Siyosat", description: "Siyosatga oid yangiliklar" },
        {
            id: 4,
            name: "Madaniyat",
            description: "Madaniyatga oid yangiliklar",
        },
        {
            id: 5,
            name: "Sog'liqni saqlash",
            description: "Sog'liq va tibbiyot",
        },
        {
            id: 6,
            name: "Moliya",
            description: "Moliya va iqtisodiyot yangiliklari",
        },
        { id: 7, name: "Ta'lim", description: "Ta'lim va o'quv resurslari" },
        { id: 8, name: "Sayohat", description: "Sayohat va turizm" },
        {
            id: 9,
            name: "O'yinlar",
            description: "Kompyuter o‘yinlari va yangiliklar",
        },
        { id: 10, name: "Oziq-ovqat", description: "Taomlar va retseptlar" },
        { id: 11, name: "Moda", description: "Moda va uslub yangiliklari" },
        {
            id: 12,
            name: "Ilmiy Tadqiqotlar",
            description: "Ilmiy yangiliklar va tadqiqotlar",
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    
    const [status, setStatus] = useState(false);
    const changeStatus = () => {
        setStatus(!status);
    };

    // Pagination logic
    const indexOfLastCategory = currentPage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentCategories = categories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className=" space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Kategoriyalar</h2>
                <AddCategory changeStatus={changeStatus} />
            </div>

            {/* Categories List as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 space-y-2"
                    >
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-gray-500">{category.description}</p>
                        <div className="flex justify-between mt-4">
                            <EditCategory changeStatus={changeStatus} />
                            <DeleteContainer changeStatus={changeStatus} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-4">
                <Button
                    variant="outlined"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                >
                    Previous
                </Button>
                <div className="font-bold text-lg">{currentPage}</div>
                <Button
                    variant="outlined"
                    size="sm"
                    disabled={
                        currentPage ===
                        Math.ceil(categories.length / itemsPerPage)
                    }
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default CategoryList;
