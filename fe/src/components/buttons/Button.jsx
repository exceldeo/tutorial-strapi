import cx from "@/utils/cx";

const Button = ({
  buttonType,
  outlined,
  size = "md",
  wide,
  squared,
  circle,
  isLoading,
  disabled,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={cx(
        "btn",
        buttonType === "primary"
          ? "btn-primary"
          : buttonType === "secondary"
          ? "btn-secondary"
          : buttonType === "accent"
          ? "btn-accent"
          : buttonType === "ghost"
          ? "btn-ghost"
          : buttonType === "error"
          ? "btn-error"
          : buttonType === "gray"
          ? "border-none bg-gray-500"
          : buttonType === "success"
          ? "border-none bg-green-500"
          : buttonType === "white"
          ? outlined
            ? "border-white bg-transparent text-white hover:border-white hover:bg-primary"
            : "border-none bg-white text-primary hover:bg-gray-50"
          : "",
        outlined ? "btn-outline" : "",
        size === "xs"
          ? "btn-xs"
          : size === "sm"
          ? "btn-sm"
          : size === "lg"
          ? "height-[2rem] btn-lg"
          : "",
        wide ? "btn-wide" : "",
        squared ? "btn-square" : "",
        circle ? "btn-circle" : "",
        disabled ? "btn-disabled" : "",
        isLoading ? "btn-disabled" : "",
        className ?? ""
      )}
      disabled={disabled}
      {...rest}
    >
      <span
        className={cx(
          "relative flex gap-2 whitespace-nowrap",
          isLoading ? "opacity-70" : ""
        )}
      >
        {children}
      </span>
      {isLoading ? (
        <span className="absolute max-w-fit">
          <Spinner color="neutral" />
        </span>
      ) : (
        <></>
      )}
    </button>
  );
};

export default Button;
