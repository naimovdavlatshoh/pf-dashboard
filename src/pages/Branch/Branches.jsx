import React, { useState } from "react";
import { AddBranch } from "./AddBranch";
import { Button } from "@material-tailwind/react";
import { EditBranch } from "./EditBranch";
import { CircleX, Trash, Trash2 } from "lucide-react";
import { DeleteContainer } from "../../components/DeleteContainer";

const Branches = () => {
    const [branches] = useState([
        { id: 1, name: "Branch 1", location: "Location 1" },
        { id: 2, name: "Branch 2", location: "Location 2" },
        { id: 3, name: "Branch 3", location: "Location 3" },
        { id: 4, name: "Branch 4", location: "Location 4" },
        { id: 5, name: "Branch 5", location: "Location 5" },
        { id: 6, name: "Branch 6", location: "Location 6" },
        { id: 7, name: "Branch 7", location: "Location 7" },
        { id: 8, name: "Branch 8", location: "Location 8" },
        { id: 9, name: "Branch 9", location: "Location 9" },
        { id: 10, name: "Branch 10", location: "Location 10" },
    ]);
    const [status, setStatus] = useState(false);
    const changeStatus = () => {
        setStatus(!status);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination logic
    const indexOfLastBranch = currentPage * itemsPerPage;
    const indexOfFirstBranch = indexOfLastBranch - itemsPerPage;
    const currentBranches = branches.slice(
        indexOfFirstBranch,
        indexOfLastBranch
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className=" space-y-2">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold">Fliallar</h2>
                <AddBranch changeStatus={changeStatus} />{" "}
                {/* Yangi filial qo'shish tugmasi */}
            </div>

            {/* Branches List as Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                {currentBranches.map((branch) => (
                    <div
                        key={branch.id}
                        className="bg-white shadow-xl rounded-2xl p-6 space-y-4 border border-gray-200"
                    >
                        <h3 className="text-xl font-semibold">{branch.name}</h3>
                        <p className="text-gray-500">{branch.location}</p>
                        <div className="flex space-x-4">
                            <EditBranch changeStatus={changeStatus} />
                            <DeleteContainer changeStatus={changeStatus} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10">
                <Button
                    variant="outlined"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                >
                    Orqa
                </Button>
                <div className="flex items-center mx-4">
                    <span>Sahifa {currentPage}</span>
                </div>
                <Button
                    variant="outlined"
                    size="sm"
                    disabled={
                        currentPage ===
                        Math.ceil(branches.length / itemsPerPage)
                    }
                    onClick={() => paginate(currentPage + 1)}
                >
                    Oldin
                </Button>
            </div>
        </div>
    );
};

export default Branches;
