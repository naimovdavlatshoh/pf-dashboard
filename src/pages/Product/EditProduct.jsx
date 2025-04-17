import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Option,
    Select,
    Textarea,
} from "@material-tailwind/react";
import { Bolt, Trash2 } from "lucide-react";
import { DeleteData, GetDataSimple, PostDataToken, PutDataToken } from "../..";
import { Toaster, toast } from "react-hot-toast";

export function EditProduct({ product, changeStatus }) {
    console.log(product);
    const [open, setOpen] = React.useState(false);
    const [nameuz, setNameuz] = useState(product?.translations?.uz?.name);
    const [descuz, setDescuz] = useState(
        product?.translations?.uz?.description
    );
    const [nameru, setNameru] = useState(product?.translations?.ru?.name);
    const [descru, setDescru] = useState(
        product?.translations?.ru?.description
    );
    const [nameen, setNameen] = useState(product?.translations?.en?.name);
    const [descen, setDescen] = useState(
        product?.translations?.en?.description
    );
    const [category, setCategory] = useState(product.category.id);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        GetDataSimple("category/for/admin?limit=20&page=1").then((res) => {
            setCategories(res.results);
        });
    }, []);

    const handleOpen = () => setOpen(!open);

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
            PutDataToken(`product/${product.id}/`, formData)
                .then((res) => {
                    toast.success("Продукт обновлена");
                    changeStatus();
                    handleOpen();
                })
                .catch((err) => {
                    handleOpen();
                    changeStatus();
                    toast.error("Продукт обновить не удалось");
                });
        }
    };

    const deleteImage = (id) => {
        DeleteData(`product/image/${id}/`).then(() => {
            changeStatus();
        });
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outlined"
                className="flex gap-2 items-center h-[40px] px-2"
            >
                <Bolt />
                Обновить
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
                <DialogHeader>Обновление продукта</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-3 h-[450px] overflow-y-scroll py-3">
                        <Input
                            defaultValue={nameru}
                            onChange={(e) => setNameru(e.target.value)}
                            label="Название продукта (ру)"
                        />
                        <Textarea
                            defaultValue={descru}
                            label="Описание (ру)"
                            onChange={(e) => setDescru(e.target.value)}
                        ></Textarea>
                        <Input
                            defaultValue={nameuz}
                            onChange={(e) => setNameuz(e.target.value)}
                            label="Название продукта (uz)"
                        />
                        <Textarea
                            defaultValue={descuz}
                            label="Описание (uz)"
                            onChange={(e) => setDescuz(e.target.value)}
                        ></Textarea>
                        <Input
                            defaultValue={nameen}
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
                        <div className="flex flex-wrap gap-2">
                            {product.product_image.map((image) => (
                                <div key={image.id} className="relative">
                                    <button
                                        onClick={() => deleteImage(image.id)}
                                        className="w-[25px] h-[25px] absolute right-[-7px] top-[-7px] bg-red-500 rounded-full flex items-center justify-center text-white"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                    <img
                                        className="w-[150px] h-[150px] rounded-md object-cover"
                                        src={image.image}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>
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
