import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Bolt } from "lucide-react";

export function EditPartneer() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outlined"
                className="flex gap-2 items-center h-[40px] px-2"
            >
                <Bolt /> O'zgartirish
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Partnyor o'zgartirish</DialogHeader>
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
