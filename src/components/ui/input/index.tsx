import { type RefObject } from "react";
import styles from "./styles.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  errorMessage?: string;
  innerRef?: RefObject<HTMLInputElement>;
}

export default function Input({
  label,
  errorMessage,
  className = "",
  innerRef,
  ...rest
}: Props) {
  return (
    <>
      <label>
        {label}
        <input
          {...rest}
          ref={innerRef}
          className={`${className} ${errorMessage ? styles.error : ""}`}
        />
      </label>
      {errorMessage && (
        <p className={styles["error-message"]}>{errorMessage}</p>
      )}
    </>
  );
}
