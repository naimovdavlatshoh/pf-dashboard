import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { AddPartneer } from "./AddPartneer";
import { Edit } from "lucide-react";
import { EditPartneer } from "./EditPartneer";
import { DeleteContainer } from "../../components/DeleteContainer";
import { customhook } from "../customhook";

const Partneers = () => {
    const {
        data: partneers,
        page,
        nextPage,
        prevPage,
        totalPages,
        refresh,
    } = customhook("partner/for/admin/", 6);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Партнеры</h2>
                <AddPartneer changeStatus={refresh} />
            </div>

            {/* Partners List as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {partneers.map((partner) => (
                    <div
                        key={partner.id}
                        className="bg-white shadow-xl rounded-2xl p-4 border border-gray-200 space-y-3"
                    >
                        <img
                            src={partner.image}
                            alt={partner.name}
                            className="w-full h-40 object-cover rounded-xl"
                        />

                        <div className="flex justify-between mt-4">
                            <EditPartneer
                                changeStatus={refresh}
                                partner={partner}
                            />
                            <DeleteContainer
                                url={`partner/${partner.id}/`}
                                changeStatus={refresh}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
        </div>
    );
};

export default Partneers;
