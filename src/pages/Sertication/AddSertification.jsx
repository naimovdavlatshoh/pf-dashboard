import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { ListFilterPlus } from "lucide-react";

export function AddSertification() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="gradient"
                className="flex items-center gap-3"
            >
                <ListFilterPlus /> Qo'shish
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Sertifikat qo'shish</DialogHeader>
                <DialogBody></DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Yopish</span>
                    </Button>
                    <Button variant="gradient" onClick={handleOpen}>
                        <span>Tasdiqlash</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
