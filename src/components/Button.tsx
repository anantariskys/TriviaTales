import React, { ButtonHTMLAttributes } from "react";

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "primary-outline"
    | "secondary"
    | "secondary-outline"
    | "dark"
    | "dark-outline";
  width?: "w-full" | "w-fit";
}
const Button: React.FC<buttonProps> = ({
  variant = "primary",
  width = "w-full",
  children,
  type,
  onClick,
}) => {
  let className = "";
  switch (variant) {
    case "primary":
      className = "bg-primary text-white";
      break;
    case "secondary":
      className = "bg-secondary text-white";
      break;
    case "secondary-outline":
      className =
        "bg-transparent border  border-secondary hover:bg-secondary hover:text-white transition-colors text-primary";
      break;
    case "primary-outline":
      className =
        "bg-transparent border  border-primary hover:bg-primary hover:text-white transition-colors text-primary";
      break;
    case "dark":
      className =
        "bg-neutral-800    hover:border-neutral-900 text-white transition-all ";
      break;
    case "dark-outline":
      className =
        "bg-transparent border  border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors text-neutral-800";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${width} px-4 md:px-8 outline-none md:text-base text-sm py-2 gap-4 flex items-center justify-center active:scale-95 h-fit duration-300  rounded `}
    >
      {children}
    </button>
  );
};

export default Button;
