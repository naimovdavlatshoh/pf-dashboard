import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { AddProject } from "./AddProject";
import { EditProject } from "./EditProject";
import { DeleteContainer } from "../../components/DeleteContainer";

const Projects = () => {
    const [projects] = useState([
        {
            id: 1,
            name: "DKNodes Marketplace",
            description: "Onlayn bozor uchun veb-platforma",
            image: "https://via.placeholder.com/300x200", // Surat URL
        },
        {
            id: 2,
            name: "Afandi Food Dashboard",
            description: "Restoran boshqaruv tizimi",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 3,
            name: "Real Estate Platform",
            description: "Ko'p qavatli uylar savdo va xarid platformasi",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 4,
            name: "Blog Platformasi",
            description: "Material Tailwind yordamida yaratilgan blog sayti",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 5,
            name: "Portfolio Sayti",
            description: "Shaxsiy portfolio sayti",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 6,
            name: "To-do App",
            description: "Oddiy vazifalar ro'yxati ilovasi",
            image: "https://via.placeholder.com/300x200",
        },
    ]);
    const [status, setStatus] = useState(false);
    const changeStatus = () => {
        setStatus(!status);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Pagination logic
    const indexOfLastProject = currentPage * itemsPerPage;
    const indexOfFirstProject = indexOfLastProject - itemsPerPage;
    const currentProjects = projects.slice(
        indexOfFirstProject,
        indexOfLastProject
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className=" space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Loyihalar</h2>
                <AddProject changeStatus={changeStatus} />
            </div>

            {/* Projects List as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white shadow-xl rounded-2xl p-4 border border-gray-200 space-y-3"
                    >
                        <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-40 object-cover rounded-xl"
                        />
                        <div>
                            <h3 className="text-xl font-bold">
                                {project.name}
                            </h3>
                            <p className="text-gray-500">
                                {project.description}
                            </p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <EditProject changeStatus={changeStatus} />
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
                        Math.ceil(projects.length / itemsPerPage)
                    }
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Projects;
