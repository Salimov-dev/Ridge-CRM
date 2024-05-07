import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
// MUI
import { Box, FormHelperText } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface SearchDatePickerProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  value: unknown;
  onChange: any;
  helperText?: string;
  disabled?: boolean;
  color?: string;
}

const SearchDatePicker: FC<SearchDatePickerProps> = ({
  register,
  name,
  label,
  value,
  onChange,
  helperText = "",
  disabled = false,
  color = "Crimson"
}) => {
  return (
    <Box sx={{ width: "100%", marginBottom: "-3px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          {...register(name)}
          label={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: value ? "green" : "gray"
              },
              "&.Mui-focused fieldset": {
                borderColor: "green"
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
          }}
        />
      </LocalizationProvider>
      <FormHelperText sx={{ color: color }}>{helperText}</FormHelperText>
    </Box>
  );
};

export default SearchDatePicker;
