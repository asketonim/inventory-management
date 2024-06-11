import { type RefObject } from "react";
import "./styles.css";

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string;
  className?: string;
  errorMessage?: string;
  innerRef?: RefObject<HTMLInputElement>
}

export default function Input({ label, errorMessage, className, innerRef, ...rest }: Props) {
  return (
    <>
      <label>
        {label}
        <input {...rest} ref={innerRef} className={`${className} ${errorMessage ? "error" : ""}`} />
      </label>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}
