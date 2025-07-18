import React from "react";
import { PinContainer } from "./ui/3d-pin";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SocialPinCardProps {
    title: string;
    description: string;
    href: string;
    Icon: LucideIcon;
    gradient: string;
    showBackgroundIcon?: boolean;
    backgroundImage?: string;
}

const SocialPinCard: React.FC<SocialPinCardProps> = ({
    title,
    description,
    href,
    Icon,
    gradient,
    showBackgroundIcon = false,
    backgroundImage,
}) => {
    return (
        <PinContainer title={title} href={href}>
            <div className="relative flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <Icon className="text-slate-100" size={20} />
                        <h3 className="font-bold text-base text-slate-100 m-0">{title}</h3>
                    </div>
                    <p className="text-sm text-slate-400">{description}</p>
                </div>

                {/* Gradient box with overlapping SVG */}
                <div className={`relative z-10 flex flex-1 w-full rounded-lg mt-4 ${gradient}`}>
                    {showBackgroundIcon && backgroundImage && (
                        <Image
                            src={backgroundImage}
                            alt=""
                            fill
                            className="absolute opacity-20 z-10 object-contain pointer-events-none p-4"
                        />
                    )}
                </div>
            </div>
        </PinContainer>
    );
};

export default SocialPinCard;
