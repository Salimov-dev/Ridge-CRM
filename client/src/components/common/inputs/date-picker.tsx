// MUI
import { Box, FormHelperText } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const today = dayjs();

const DatePickerStyled = ({
  register,
  name,
  label,
  value,
  onChange,
  helperText,
  errors,
  disabled,
  color = "red",
  minDate=today,
  maxDate=null,
}) => {

  return (
    <Box sx={{ width: "100%", marginBottom: "-3px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          {...register(name)}
          label={label}
          value={value}
          onChange={onChange}
          error={!!errors}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "green",
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiButtonBase-root": {
              color: value ? "white" : "gray",
            },
          }}
        />
      </LocalizationProvider>
      <FormHelperText sx={{ color: color }}>
        {errors ? errors?.message : helperText}
      </FormHelperText>
    </Box>
  );
};

export default DatePickerStyled;
