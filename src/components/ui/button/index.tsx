import styles from "./styles.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
}

export default function Button({ label, className = "", ...rest }: Props) {
  return (
    <button className={`${styles.button} ${className}`} {...rest}>
      {label}
    </button>
  );
}
