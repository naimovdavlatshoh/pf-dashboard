import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { AddSertification } from "./AddSertification";
import { EditSertification } from "./EditSertifications";
import { DeleteContainer } from "../../components/DeleteContainer";
import { customhook } from "../customhook";

const Certificates = () => {
    const {
        data: certificates,
        page,
        nextPage,
        prevPage,
        totalPages,
        refresh,
    } = customhook("certificate/for/admin/", 6);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Сертификаты</h2>
                <AddSertification changeStatus={refresh} />
            </div>

            {/* Certificates List as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates?.map((certificate) => (
                    <div
                        key={certificate.id}
                        className="bg-white shadow-xl rounded-2xl p-4 border border-gray-200 space-y-3"
                    >
                        <img
                            src={certificate.image}
                            alt={certificate.name}
                            className="w-full h-40 object-cover rounded-xl"
                        />

                        <div className="flex justify-between mt-4">
                            <EditSertification
                                changeStatus={refresh}
                                certificate={certificate}
                            />
                            <DeleteContainer
                                url={`certificates/${certificate.id}/`}
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

export default Certificates;
