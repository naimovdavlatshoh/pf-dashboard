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
                            defaultValue={
                                "Модель: AWAL_250 т/час фильтры очистки воды"
                            }
                        />
                        <Textarea
                            defaultValue={
                                "Модель: Фильтры очистки воды AWAL_250 т/час. Фильтры обратного осмоса — это современные системы глубокой очистки воды, предназначенные для эффективного удаления примесей, солей, бактерий и тяжелых металлов. Они идеально подходят для фильтрации как подземных (скважинных) вод, так и водопроводной воды. Эти фильтры обеспечивают населения питьевой водой в рамках малого бизнеса и широко оборудуются на автомойках,на текстильных фабриках, а так же широко используется в теплицах для получения качественного урожая."
                            }
                            label="Описание (ру)"
                            onChange={(e) => setDescru(e.target.value)}
                        ></Textarea>
                        <Input
                            defaultValue={
                                "Model : AWAL_250 t/soat suv tozalash filtrlari"
                            }
                            onChange={(e) => setNameuz(e.target.value)}
                            label="Название продукта (uz)"
                        />
                        <Textarea
                            defaultValue={
                                "Model: AWAL_250 tonna/soat suvni tozalash filtrlari. Teskari osmos filtrlari – bu zamonaviy chuqur tozalash tizimlari bo‘lib, ular suvdan iflosliklar, tuzlar, bakteriyalar va og‘ir metallarni samarali tarzda chiqarib tashlash uchun mo‘ljallangan. Ular yer osti (quduq) suvlari hamda vodoprovod suvlari uchun juda mos keladi. Bu filtrlar aholini ichimlik suvi bilan ta’minlashda, kichik biznes doirasida keng qo‘llaniladi va avtomoykalar, to‘qimachilik fabrikalarida keng o‘rnatiladi, shuningdek, issiqxonalarda sifatli hosil olish uchun keng qo‘llaniladi."
                            }
                            label="Описание (uz)"
                            onChange={(e) => setDescuz(e.target.value)}
                        ></Textarea>
                        <Input
                            defaultValue={
                                "Model : AWAL_250 t/h water purification filters"
                            }
                            onChange={(e) => setNameen(e.target.value)}
                            label="Название продукта (en)"
                        />
                        <Textarea
                            defaultValue={
                                "Model: Water purification filters AWAL_250 T/hour. Reverse osmosis filters are modern deep water purification systems designed to effectively remove impurities, salts, bacteria, and heavy metals. They are ideal for filtering both underground (well) water and tap water. These filters provide drinking water for the population within small businesses and are widely installed at car washes, textile factories, and are also commonly used in greenhouses to ensure a high-quality harvest."
                            }
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
