import { forwardRef, ComponentProps } from "react";

import styles from "./button.module.css";

interface ButtonProps extends Omit<ComponentProps<"button">, "className"> {
  colorType?: "primary" | "secondary" | "danger" | "gradient";
}

const Button = forwardRef<
  HTMLButtonElement, 
  ButtonProps
>(({ colorType, children, ...rest }, ref) => {

  let btnClass = styles.button;
  if (colorType === 'primary') {
    btnClass = styles.primary;
  } else if (colorType === 'secondary') {
    btnClass = styles.secondary;
  } else if (colorType === 'danger') {
    btnClass = styles.danger;
  } else if (colorType === 'gradient') {
    btnClass = styles.gradient;
  }

  return (
    <button ref={ref} className={btnClass} {...rest}>
      {children}
    </button>
  );
});

export default Button;
