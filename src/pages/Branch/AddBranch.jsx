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

export function AddBranch({ changeStatus }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        uz: { city: "", address: "" },
        ru: { city: "", address: "" },
        en: { city: "", address: "" },
        phone: "",
        location: "",
    });

    const handleOpen = () => setOpen(!open);

    const handleChange = (lang, field, value) => {
        setForm((prev) => ({
            ...prev,
            [lang]: {
                ...prev[lang],
                [field]: value,
            },
        }));
    };

    const handleGeneralChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            translations: {
                uz: {
                    city: form.uz.city,
                    address: form.uz.address,
                    phone: form.phone,
                    location: form.location,
                },
                ru: {
                    city: form.ru.city,
                    address: form.ru.address,
                    phone: form.phone,
                    location: form.location,
                },
                en: {
                    city: form.en.city,
                    address: form.en.address,
                    phone: form.phone,
                    location: form.location,
                },
            },
        };

        PostDataTokenJson("branch/for/admin/", payload)
            .then((res) => {
                if ((res.data && res.status == 200) || res.status == 201) {
                    toast.success("Филиал добавлена");
                    changeStatus();
                    handleOpen();
                } else {
                    toast.error("Филиал добавить не удалось");
                    changeStatus();
                    handleOpen();
                }
            })
            .catch((err) => {
                toast.error("Филиал добавить не удалось");
                changeStatus();
                handleOpen();
            });
    };

    const languages = ["uz", "ru", "en"];
    const langFields = [
        { key: "city", label: "Город" },
        { key: "address", label: "Адрес" },
    ];
    const generalFields = [
        { key: "phone", label: "Телефон" },
        { key: "location", label: "Локация" },
    ];

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
                size="lg"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader> Добавить Филиал </DialogHeader>
                <DialogBody className="grid grid-cols-1 gap-6">
                    <div className="h-[400px] overflow-y-scroll">
                        {/* Multi-language fields (city, address) */}
                        {langFields.map((field) => (
                            <div key={field.key}>
                                <h3 className="mb-2 font-semibold text-sm">
                                    {field.label}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {languages.map((lang) => (
                                        <Input
                                            key={lang}
                                            label={`(${lang})`}
                                            value={form[lang][field.key]}
                                            onChange={(e) =>
                                                handleChange(
                                                    lang,
                                                    field.key,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* General (single) fields: phone, location */}
                        {generalFields.map((field) => (
                            <div key={field.key}>
                                <h3 className="mb-2 font-semibold text-sm">
                                    {field.label}
                                </h3>
                                <Input
                                    label={field.label}
                                    value={form[field.key]}
                                    onChange={(e) =>
                                        handleGeneralChange(
                                            field.key,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        ))}
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
                        <span>Подтвердить</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
