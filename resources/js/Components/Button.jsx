const Button = ({
    children,
    variant = "primary",
    type = "button",
    onClick,
    className = "",
    disabled = false,
    ...props
}) => {
    const baseClasses =
        "flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors";

    const variants = {
        primary:
            "bg-[#1172d4] text-white hover:bg-[#0d5cb5] disabled:opacity-50 disabled:cursor-not-allowed",
        secondary:
            "bg-[#233648] text-white hover:bg-[#2d4456] disabled:opacity-50 disabled:cursor-not-allowed",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            {...props}
        >
            <span className="truncate">{children}</span>
        </button>
    );
};

export default Button;
