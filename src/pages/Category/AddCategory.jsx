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
import { PostDataTokenJson } from "../..";
import { Toaster, toast } from "react-hot-toast";

export function AddCategory({ changeStatus }) {
    const [open, setOpen] = useState(false);
    const [uzname, setUzname] = useState("");
    const [runame, setRuname] = useState("");
    const [enname, setEnname] = useState("");

    const handleOpen = () => setOpen(!open);

    const handleSubmit = async () => {
        const payload = {
            translations: {
                uz: { name: uzname },
                ru: { name: runame },
                en: { name: enname },
            },
        };
        if (uzname == "" || runame == "" || enname == "") {
            handleOpen();
            toast.error("Заполните все поля.");
        } else {
            PostDataTokenJson("category/for/admin/", payload)
                .then((res) => {
                    toast.success("Категория добавлена");
                    changeStatus();
                    handleOpen();
                })
                .catch((err) => {
                    toast.error("Категория добавить не удалось");
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
                <ListFilterPlus />
                Добавить
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
                <DialogHeader>Добавить категорию</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-3">
                        <Input
                            label="Uzbcha nomi"
                            value={uzname}
                            onChange={(e) => setUzname(e.target.value)}
                            type="text"
                        />
                        <Input
                            label="Русское имя"
                            value={runame}
                            onChange={(e) => setRuname(e.target.value)}
                            type="text"
                        />
                        <Input
                            label="English name"
                            value={enname}
                            onChange={(e) => setEnname(e.target.value)}
                            type="text"
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
