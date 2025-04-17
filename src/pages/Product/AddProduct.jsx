import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Textarea,
} from "@material-tailwind/react";
import { ListFilterPlus } from "lucide-react";
import { GetDataSimple, PostDataToken } from "../..";
import { Toaster, toast } from "react-hot-toast";

export function AddProduct({ changeStatus }) {
    const [open, setOpen] = React.useState(false);
    const [nameuz, setNameuz] = useState("");
    const [descuz, setDescuz] = useState("");
    const [nameru, setNameru] = useState("");
    const [descru, setDescru] = useState("");
    const [nameen, setNameen] = useState("");
    const [descen, setDescen] = useState("");
    const [category, setCategory] = useState(null);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        GetDataSimple("category/for/admin?limit=20&page=1").then((res) => {
            setCategories(res.results);
        });
    }, []);

    const handleSubmit = async () => {
        const formData = new FormData();

        // Rasm fayllarini barchasini birma-bir qo'shamiz
        images.forEach((img, index) => {
            formData.append("product_image", img);
        });

        formData.append("category", category);
        formData.append(
            "translations",
            JSON.stringify({
                uz: { name: nameuz, description: descuz },
                ru: { name: nameru, description: descru },
                en: { name: nameen, description: descen },
            })
        );
        if (nameuz == "" || nameru == "" || nameen == "" || category == null) {
            handleOpen();
            toast.error("Заполните все поля.");
        } else {
            PostDataToken("product/for/admin/", formData)
                .then((res) => {
                    toast.success("Продукт добавлена");
                    changeStatus();
                    handleOpen();
                })
                .catch((err) => {
                    handleOpen();
                    changeStatus();
                    toast.error("Продукт добавить не удалось");
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
                <DialogHeader>Добавить продукт</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-3 h-[450px] overflow-y-scroll py-3">
                        <Input
                            onChange={(e) => setNameru(e.target.value)}
                            label="Название продукта (ру)"
                        />
                        <Textarea
                            defaultValue={descru}
                            label="Описание (ру)"
                            onChange={(e) => setDescru(e.target.value)}
                        ></Textarea>
                        <Input
                            onChange={(e) => setNameuz(e.target.value)}
                            label="Название продукта (uz)"
                        />
                        <Textarea
                            defaultValue={descuz}
                            label="Описание (uz)"
                            onChange={(e) => setDescuz(e.target.value)}
                        ></Textarea>
                        <Input
                            onChange={(e) => setNameen(e.target.value)}
                            label="Название продукта (en)"
                        />
                        <Textarea
                            defaultValue={descen}
                            label="Описание (en)"
                            onChange={(e) => setDescen(e.target.value)}
                        ></Textarea>
                        <div className="h-[50px]">
                            <Select label="Категория">
                                {categories?.map((category) => (
                                    <Option
                                        onClick={(e) =>
                                            setCategory(category.id)
                                        }
                                        value="1"
                                    >
                                        {category.translations.ru.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        <label className="block">
                            <span className="text-gray-700 text-sm mb-1 block">
                                добавить изображение
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100"
                                onChange={(e) => setImages([...e.target.files])}
                            />
                        </label>
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
