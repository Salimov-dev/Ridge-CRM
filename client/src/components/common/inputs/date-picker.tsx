import { UseFormRegister } from "react-hook-form";
import { FC } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import styled from "@emotion/styled";
// MUI
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// utils
import getDateToday from "@utils/date/get-date-today";
// components
import ErrorsForInput from "./errors-for-input";
// interfaces
import { ITheme } from "@interfaces/theme/theme.interface";

interface DatePickerStyledProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  value: any;
  onChange: any;
  disabled?: boolean;
  errors: any;
  minDate?: any;
  maxDate?: any;
}

const Component = styled(Box)`
  width: 100%;
  margin-bottom: -3px;
`;

interface StyledDatePickerProps {
  colors: ITheme;
  value: any;
  errors: any;
}

const StyledDatePicker = styled(DatePicker)(
  ({ errors, colors, value }: StyledDatePickerProps) => ({
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: errors ? colors.error["red"] : "gray"
      },
      "&.Mui-focused fieldset": {
        borderColor: errors ? "red" : "green"
      }
    },
    "& .MuiInputLabel-root": {
      color: "gray"
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiButtonBase-root": {
      color: value ? "white" : "gray"
    }
  })
);

const today = getDateToday();

const DatePickerStyled: FC<DatePickerStyledProps> = ({
  register,
  name,
  label,
  value,
  onChange,
  disabled = false,
  errors = null,
  minDate = today,
  maxDate = null
}): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Component>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <StyledDatePicker
          {...register(name)}
          label={label}
          value={value}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          errors={errors}
          colors={colors}
        />
      </LocalizationProvider>
      <ErrorsForInput errors={errors} padding="0 0 0 10px" />
    </Component>
  );
};

export default DatePickerStyled;
