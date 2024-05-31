import "./styles.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage: string;
}

export default function Input({ label, errorMessage, ...rest }: Props) {
  return (
    <>
      <label>
        {label}
        <input {...rest} className={errorMessage ? "error" : ""} />
      </label>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}
