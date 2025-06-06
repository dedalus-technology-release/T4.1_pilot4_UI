import Select from "react-select";
import { Form } from "react-bootstrap";
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
    <Form.Group>
      <Form.Label className="fw-semibold m-0">Select Apartment</Form.Label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
        classNamePrefix="react-select"
      />
    </Form.Group>
  );
};
