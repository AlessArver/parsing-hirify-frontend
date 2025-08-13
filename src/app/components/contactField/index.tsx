export interface ContactFieldProps {
  label: string;
  value?: string;
}
export const ContactField = ({ label, value }: ContactFieldProps) => {
  if (label === "email" && value) {
    return (
      <span>
        {label}: <a href={`mailto:${value}`}>{value}</a>
      </span>
    );
  }
  if (label === "telegram" && value) {
    return (
      <span>
        {label}:{" "}
        <a href={`https://t.me/${value?.replace("@", "")}`} target="_blank">
          {value}
        </a>
      </span>
    );
  }
  if (label === "url" && value) {
    return (
      <span>
        {label}:{" "}
        <a href={value} target="_blank">
          {value}
        </a>
      </span>
    );
  }
};
