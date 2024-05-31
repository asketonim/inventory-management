import "./styles.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, ...rest }: Props) {
  return <button {...rest}>{label}</button>;
}
