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
import { ListFilterPlus } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { PostDataToken } from "../..";

export function AddProject({ changeStatus }) {
    const [open, setOpen] = React.useState(false);
    const [nameuz, setNameuz] = useState("");
    const [nameru, setNameru] = useState("");
    const [nameen, setNameen] = useState("");
    const [img, setImg] = useState(null);

    const handleOpen = () => setOpen(!open);

    const handleSubmit = async () => {
        if (!nameuz || !nameru || !nameen || !img) {
            toast.error("Заполните все поля.");
            handleOpen();
        }

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
            PostDataToken("project/for/admin/", formData)
                .then((res) => {
                    console.log(res);
                    if ((res.data && res.status == 200) || res.status == 201) {
                        toast.success("Продукт добавлена");
                        changeStatus();
                        handleOpen();
                    } else {
                        toast.error("Продукт добавить не удалось");
                        changeStatus();
                        handleOpen();
                    }
                })
                .catch((err) => {
                    toast.error("Продукт добавить не удалось");
                    changeStatus();
                    handleOpen();
                });
        }
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="gradient"
                className="flex items-center gap-3"
            >
                <ListFilterPlus /> Добавить
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
                <DialogHeader>Добавить проект</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-3">
                        <Textarea
                            onChange={(e) => setNameru(e.target.value)}
                            label="описание проекта (ру)"
                        ></Textarea>
                        <Textarea
                            onChange={(e) => setNameuz(e.target.value)}
                            label="описание проекта (uz)"
                        ></Textarea>
                        <Textarea
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
