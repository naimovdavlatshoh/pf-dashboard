import React from "react";
import { Button } from "@material-tailwind/react";
import { AddCategory } from "./AddCategory";
import { EditCategory } from "./EditCategory";
import { DeleteContainer } from "../../components/DeleteContainer";
import { customhook } from "../customhook";
// Hookni joylashtirgan joyingizga qarab path o'zgartiring

const Categories = () => {
    const {
        data: categories,
        page,
        nextPage,
        prevPage,
        totalPages,
        refresh,
    } = customhook("category/for/admin", 6);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Категории</h2>
                <AddCategory changeStatus={refresh} />
            </div>

            {/* Categories List as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories?.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 space-y-2"
                    >
                        <h3 className="text-xl font-bold">
                            {category?.translations?.ru.name}
                        </h3>
                        <p className="text-gray-500">{category.description}</p>
                        <div className="flex justify-between mt-4">
                            <EditCategory
                                changeStatus={refresh}
                                category={category}
                            />
                            <DeleteContainer
                                url={`category/${category.id}/`}
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

export default Categories;
