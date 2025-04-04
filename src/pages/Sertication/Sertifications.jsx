import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { AddSertification } from "./AddSertification";
import { EditSertification } from "./EditSertifications";
import { DeleteContainer } from "../../components/DeleteContainer";

const Certificates = () => {
    const [certificates] = useState([
        {
            id: 1,
            name: "Web Development Certificate",
            date: "2024-12-15",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 2,
            name: "React Mastery Certificate",
            date: "2025-01-20",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 3,
            name: "Next.js Expert Certificate",
            date: "2025-02-10",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 4,
            name: "Tailwind CSS Pro Certificate",
            date: "2025-03-05",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 5,
            name: "Full-Stack Developer Certificate",
            date: "2025-04-01",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 6,
            name: "JavaScript Master Certificate",
            date: "2025-04-03",
            image: "https://via.placeholder.com/300x200",
        },
    ]);
    const [status, setStatus] = useState(false);
    const changeStatus = () => {
        setStatus(!status);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastCertificate = currentPage * itemsPerPage;
    const indexOfFirstCertificate = indexOfLastCertificate - itemsPerPage;
    const currentCertificates = certificates.slice(
        indexOfFirstCertificate,
        indexOfLastCertificate
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Sertifikatlar</h2>
                <AddSertification changeStatus={changeStatus} />
            </div>

            {/* Certificates List as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCertificates.map((certificate) => (
                    <div
                        key={certificate.id}
                        className="bg-white shadow-xl rounded-2xl p-4 border border-gray-200 space-y-3"
                    >
                        <img
                            src={certificate.image}
                            alt={certificate.name}
                            className="w-full h-40 object-cover rounded-xl"
                        />
                        <div>
                            <h3 className="text-xl font-bold">
                                {certificate.name}
                            </h3>
                            <p className="text-gray-500">
                                Olingan sana: {certificate.date}
                            </p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <EditSertification changeStatus={changeStatus} />
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
                        Math.ceil(certificates.length / itemsPerPage)
                    }
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Certificates;
