import "./styles.css";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  value: string;

  options: { name: string }[];
}

export default function Select({ label, value, options, ...rest }: Props) {
  return (
    <label>
      {label}
      <select {...rest} value={value}>
        {[{ name: "--" }, ...options].map(({ name }) => (
          <option value={name} className="wrap">{name}</option>
        ))}
      </select>
    </label>
  );
}
