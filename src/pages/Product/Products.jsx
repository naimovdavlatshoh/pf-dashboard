import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { AddProduct } from "./AddProduct";
import { EditProduct } from "./EditProduct";
import { DeleteContainer } from "../../components/DeleteContainer";

const Products = () => {
    const [products] = useState([
        {
            id: 1,
            name: "Product 1",
            description: "Yuqori sifatli mahsulot",
            price: "$120",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 2,
            name: "Product 2",
            description: "O‘rtacha narxli mahsulot",
            price: "$80",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 3,
            name: "Product 3",
            description: "Arzon mahsulot",
            price: "$50",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 4,
            name: "Product 4",
            description: "Yangi mahsulot",
            price: "$150",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 5,
            name: "Product 5",
            description: "Maxsus taklif",
            price: "$200",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 6,
            name: "Product 6",
            description: "Ishonchli mahsulot",
            price: "$100",
            image: "https://via.placeholder.com/300x200",
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const [status, setStatus] = useState(false);
    const changeStatus = () => {
        setStatus(!status);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className=" space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Mahsulotlar</h2>
                <AddProduct changeStatus={changeStatus} />
            </div>

            {/* Products List as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-xl rounded-2xl p-4 border border-gray-200 space-y-3"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-xl"
                        />
                        <div>
                            <h3 className="text-xl font-bold">
                                {product.name}
                            </h3>
                            <p className="text-gray-500">
                                {product.description}
                            </p>
                            <p className="text-lg font-bold mt-1">
                                {product.price}
                            </p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <EditProduct changeStatus={changeStatus} />
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
                        Math.ceil(products.length / itemsPerPage)
                    }
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Products;
