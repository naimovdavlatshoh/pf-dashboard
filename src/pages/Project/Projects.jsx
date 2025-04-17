import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { AddProject } from "./AddProject";
import { EditProject } from "./EditProject";
import { DeleteContainer } from "../../components/DeleteContainer";
import { customhook } from "../customhook";

const Projects = () => {
    const {
        data: projects,
        page,
        nextPage,
        prevPage,
        totalPages,
        refresh,
    } = customhook("project/for/admin/", 6);

    return (
        <div className=" space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Проекты</h2>
                <AddProject changeStatus={refresh} />
            </div>

            {/* Projects List as Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
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
                                {project.translations.uz.name}
                            </h3>
                            <p className="text-gray-500">
                                {project.translations.uz.description}
                            </p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <EditProject
                                changeStatus={refresh}
                                project={project}
                            />
                            <DeleteContainer
                                url={`project/${project.id}/`}
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

export default Projects;
