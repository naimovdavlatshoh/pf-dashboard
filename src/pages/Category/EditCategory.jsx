import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { Bolt } from "lucide-react";
import { GetDataSimple, PostDataTokenJson, PutDataTokenJson } from "../..";
import { Toaster, toast } from "react-hot-toast";

export function EditCategory({ changeStatus, category }) {
    console.log(category);
    const [open, setOpen] = React.useState(false);
    const [uzname, setUzname] = useState(category?.translations?.uz?.name);
    const [runame, setRuname] = useState(category?.translations?.ru?.name);
    const [enname, setEnname] = useState(category?.translations?.en?.name);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        GetDataSimple("category/1/").then((res) => {
            console.log(res);
        });
    }, []);

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
            PutDataTokenJson(`category/${category.id}/`, payload)
                .then((res) => {
                    toast.success("Категория обновлена.");
                    changeStatus();
                    handleOpen();
                })
                .catch((err) => {
                    toast.error("Категория обновить не удалось");
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
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Обновление категории</DialogHeader>
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
