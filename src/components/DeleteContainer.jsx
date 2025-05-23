import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { CircleX, ListFilterPlus } from "lucide-react";
import { DeleteData } from "..";

export function DeleteContainer({ url, changeStatus }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const handleConfirm = () => {
        DeleteData(url).then(() => {
            changeStatus();
            setOpen(false);
        });
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outlined"
                size="sm"
                color="red"
                className="ml-2 flex gap-2 items-center h-[40px]"
            >
                <CircleX />
                удалить
            </Button>
            <Dialog open={open} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        {" "}
                        <Typography className="mb-1" variant="h4">
                            Вы уверены, что хотите удалить?
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody></DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="gradient" color="red" onClick={handleOpen}>
                        <span onClick={handleConfirm}>удалить</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
