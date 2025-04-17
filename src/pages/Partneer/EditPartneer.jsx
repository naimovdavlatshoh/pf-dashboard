import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { Bolt } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { PostDataToken, PutDataToken } from "../..";

export function EditPartneer({ changeStatus, partner }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState(partner?.name);
    console.log(partner);

    const [img, setImg] = useState(null);

    const handleOpen = () => setOpen(!open);

    const handleSubmit = async () => {
        const formData = new FormData();

        if (img) {
            formData.append("image", img);
        }

        formData.append("name", name);
        if (!name) {
            handleOpen();
            toast.error("Заполните все поля.");
        } else {
            PutDataToken(`partner/${partner.id}/`, formData)
                .then((res) => {
                    if ((res.data && res.status == 200) || res.status == 201) {
                        toast.success("Партнер добавлена");
                        changeStatus();
                        handleOpen();
                    } else {
                        toast.error("Партнер добавить не удалось");
                        changeStatus();
                        handleOpen();
                    }
                })
                .catch((err) => {
                    toast.error("Партнер добавить не удалось");
                    changeStatus();
                    handleOpen();
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
                <DialogHeader>Обновление партнера</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-3">
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
