import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { Bolt } from "lucide-react";
import { PutDataToken } from "../..";
import { Toaster, toast } from "react-hot-toast";

export function EditProject({ changeStatus, project }) {
    const [open, setOpen] = React.useState(false);
    const [nameuz, setNameuz] = useState(project?.translations?.uz?.name);
    const [nameru, setNameru] = useState(project?.translations?.ru?.name);
    const [nameen, setNameen] = useState(project?.translations?.en?.name);
    const [img, setImg] = useState(null);

    const handleOpen = () => setOpen(!open);

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append("image", img);
        formData.append(
            "translations",
            JSON.stringify({
                uz: { name: "abc", description: nameuz },
                ru: { name: "abc", description: nameru },
                en: { name: "abc", description: nameen },
            })
        );
        if (nameuz == "" || nameru == "" || nameen == "") {
            handleOpen();
            toast.error("Заполните все поля.");
        } else {
            PutDataToken(`project/${project.id}/`, formData)
                .then((res) => {
                    toast.success("Продукт добавлена");
                    changeStatus();
                    handleOpen();
                })
                .catch((err) => {
                    handleOpen();
                    toast.error("Продукт добавить не удалось");
                });
        }
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outlined"
                className="flex gap-2 items-center h-[40px] px-2"
            >
                <Bolt /> Обновить
            </Button>
            <Toaster position="top-center" />
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Обновление проекта</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-3">
                        <Textarea
                            defaultValue={nameru}
                            onChange={(e) => setNameru(e.target.value)}
                            label="описание проекта (ру)"
                        ></Textarea>
                        <Textarea
                            defaultValue={nameuz}
                            onChange={(e) => setNameuz(e.target.value)}
                            label="описание проекта (uz)"
                        ></Textarea>
                        <Textarea
                            defaultValue={nameen}
                            onChange={(e) => setNameen(e.target.value)}
                            label="описание проекта (en)"
                        ></Textarea>

                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Закрыть</span>
                    </Button>
                    <Button variant="gradient" onClick={handleSubmit}>
                        <span>Подтверждение</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
