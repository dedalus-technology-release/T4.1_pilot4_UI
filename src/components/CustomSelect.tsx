import Select from "react-select";
import { Option } from "../api/models";

interface CustomSelectProps {
  options: Option[];
  placeholderText: string;
  value?: Option | null;
  onChange: (selectedOption: Option | null) => void;
}

export const CustomSelect = ({
  options,
  value,
  onChange,
  placeholderText,
}: CustomSelectProps) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholderText}
    />
  );
};
