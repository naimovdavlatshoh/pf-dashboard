import React, { useState } from "react";
import { AddBranch } from "./AddBranch";
import { Button } from "@material-tailwind/react";

import { DeleteContainer } from "../../components/DeleteContainer";
import { customhook } from "../customhook";
import { Building, MapPin, Phone } from "lucide-react";

const Branches = () => {
    const {
        data: branches,
        page,
        nextPage,
        prevPage,
        totalPages,
        refresh,
    } = customhook("branch/for/admin/", 6);

    const getSrcFromIframe = (iframeHTML) => {
        const match = iframeHTML?.match(/src="(.*?)"/);
        return match ? match[1] : "";
    };

    return (
        <div className=" space-y-2">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold">Филиалы</h2>
                <AddBranch changeStatus={refresh} />
            </div>

            {/* Branches List as Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 ">
                {branches.map((branch) => (
                    <div
                        key={branch.id}
                        className="bg-white shadow-xl rounded-2xl p-6 space-y-2 border border-gray-200"
                    >
                        <iframe
                            className="w-full h-[200px]"
                            src={getSrcFromIframe(
                                branch.translations.ru.location
                            )}
                            loading="lazy"
                        ></iframe>
                        <h3 className="text-xl font-semibold flex items-center gap-1">
                            <Building
                                size={20}
                                className="text-blue-600 mr-2"
                            />
                            {branch.translations.ru.city}
                        </h3>
                        <p className="text-gray-500 flex items-center gap-1">
                            <MapPin
                                size={18}
                                className="text-blue-600 mr-2 mt-1 flex-shrink-0"
                            />
                            {branch.translations.ru.address}
                        </p>
                        <p className="text-gray-500 flex items-center gap-1">
                            <Phone
                                size={18}
                                className="text-blue-600 mr-2 flex-shrink-0"
                            />
                            {branch.translations.ru.phone}
                        </p>
                        <div className="flex space-x-4">
                            <DeleteContainer
                                url={`branch/${branch.id}/`}
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

export default Branches;
