import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { ListFilterPlus } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { PostDataToken } from "../..";

export function AddSertification({ changeStatus }) {
    const [open, setOpen] = React.useState(false);

    const [img, setImg] = useState(null);

    const handleOpen = () => setOpen(!open);

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append("image", img);
        formData.append("name", "certificate");
        if (!img) {
            handleOpen();
            toast.error("Заполните все поля.");
        } else {
            PostDataToken("certificate/for/admin/", formData)
                .then((res) => {
                    if (res.data && res.status == 200) {
                        toast.success("Сертификат добавлена");
                        changeStatus();
                        handleOpen();
                    } else {
                        toast.error("Сертификат добавить не удалось");
                        changeStatus();
                        handleOpen();
                    }
                })
                .catch((err) => {
                    toast.error("Сертификат добавить не удалось");
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
                <DialogHeader>Добавить сертификат</DialogHeader>
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
