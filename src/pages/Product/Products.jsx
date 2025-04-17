import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { AddProduct } from "./AddProduct";
import { EditProduct } from "./EditProduct";
import { DeleteContainer } from "../../components/DeleteContainer";
import { customhook } from "../customhook";

const Products = () => {
    const {
        data: products,
        page,
        nextPage,
        prevPage,
        totalPages,
        refresh,
    } = customhook("product/for/admin/", 6);

    console.log(products);

    return (
        <div className=" space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Продукты</h2>
                <AddProduct changeStatus={refresh} />
            </div>

            {/* Products List as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product?.id}
                        className="bg-white shadow-xl rounded-2xl p-4 border border-gray-200 space-y-3"
                    >
                        <img
                            src={product?.product_image[0]?.image}
                            alt={"No img"}
                            className="w-full h-40 object-cover rounded-xl"
                        />
                        <div>
                            <h3 className="text-xl font-bold mb-3  line-clamp-2  h-[70px] ">
                                {product?.translations?.uz?.name}
                            </h3>
                            <p className="text-gray-500  line-clamp-4 h-[100px]">
                                {product?.translations?.uz?.description}
                            </p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <EditProduct
                                product={product}
                                changeStatus={refresh}
                            />
                            <DeleteContainer
                                url={`product/${product.id}/`}
                                changeStatus={refresh}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-4">
                <Button
                    variant="outlined"
                    size="sm"
                    onClick={prevPage}
                    disabled={page === 1}
                >
                    предыдущий
                </Button>
                <div className="font-bold text-lg">
                    {page} из {totalPages}
                </div>
                <Button
                    variant="outlined"
                    size="sm"
                    onClick={nextPage}
                    disabled={page === totalPages}
                >
                    следующий
                </Button>
            </div>
        </div>
    );
};

export default Products;
