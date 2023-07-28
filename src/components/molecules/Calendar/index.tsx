import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type Props = React.ComponentProps<typeof ReactDatePicker>;

const Calendar = (props: Props) => {
  const { onChange, selected } = props;

  return (
    <ReactDatePicker
      className="bg-red-50"
      selected={selected}
      onChange={onChange}
    />
  );
};

export { Calendar };
