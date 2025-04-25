/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode;
    handleClick?: () => void | Promise<void>;
    buttonText?: string;
    instantMeeting?: boolean;
    image?: string;
    buttonClassName?: string;
    buttonIcon?: string;
}

const MeetingModal = ({
    isOpen,
    onClose,
    title,
    className,
    children,
    handleClick,
    buttonText,
    instantMeeting,
    image,
    buttonClassName,
    buttonIcon,
}: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
             {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40" />
            )}
            <DialogContent className="flex w-full max-w-[520px] bg-muted flex-col gap-6 border-none  px-6 py-9">
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <img
                                src={image}
                                alt="checked"
                                className="mx-auto"
                                width={72}
                                height={72}
                            />
                        </div>
                    )}
                    <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
                        {title}
                    </h1>
                    {children}
                    <Button
                        className={
                            "focus-visible:ring-0 focus-visible:ring-offset-0 text-popover-foreground rounded-full"
                        }
                        onClick={handleClick}
                    >
                        {buttonIcon && (
                            <img
                                src={buttonIcon}
                                alt="button icon"
                                width={13}
                                height={13}
                            />
                        )}{" "}
                        &nbsp;
                        {buttonText || "Schedule Meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MeetingModal;