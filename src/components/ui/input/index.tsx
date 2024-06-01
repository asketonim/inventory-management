import "./styles.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  errorMessage?: string;
}

export default function Input({ label, errorMessage, className, ...rest }: Props) {
  return (
    <>
      <label>
        {label}
        <input {...rest} className={`${className} ${errorMessage ? "error" : ""}`} />
      </label>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}
