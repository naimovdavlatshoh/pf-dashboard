import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { AddPartneer } from "./AddPartneer";
import { Edit } from "lucide-react";
import { EditPartneer } from "./EditPartneer";
import { DeleteContainer } from "../../components/DeleteContainer";

const Partneers = () => {
    const [partners] = useState([
        {
            id: 1,
            name: "Microsoft",
            description: "Dasturiy ta'minot va xizmatlar",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 2,
            name: "Google",
            description: "Qidiruv tizimi va reklama",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 3,
            name: "Amazon",
            description: "Elektron tijorat va bulutli hisoblash",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 4,
            name: "Facebook",
            description: "Ijtimoiy tarmoqlar va reklama",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 5,
            name: "Apple",
            description: "Elektron qurilmalar va dasturiy ta'minot",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 6,
            name: "Netflix",
            description: "Onlayn video platforma",
            image: "https://via.placeholder.com/300x200",
        },
    ]);
    const [status, setStatus] = useState(false);
    const changeStatus = () => {
        setStatus(!status);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastPartner = currentPage * itemsPerPage;
    const indexOfFirstPartner = indexOfLastPartner - itemsPerPage;
    const currentPartners = partners.slice(
        indexOfFirstPartner,
        indexOfLastPartner
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Partnyorlar</h2>
                <AddPartneer changeStatus={changeStatus} status={status} />
            </div>

            {/* Partners List as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPartners.map((partner) => (
                    <div
                        key={partner.id}
                        className="bg-white shadow-xl rounded-2xl p-4 border border-gray-200 space-y-3"
                    >
                        <img
                            src={partner.image}
                            alt={partner.name}
                            className="w-full h-40 object-cover rounded-xl"
                        />
                        <div>
                            <h3 className="text-xl font-bold">
                                {partner.name}
                            </h3>
                            <p className="text-gray-500">
                                {partner.description}
                            </p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <EditPartneer changeStatus={changeStatus} />
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
                        Math.ceil(partners.length / itemsPerPage)
                    }
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Partneers;
