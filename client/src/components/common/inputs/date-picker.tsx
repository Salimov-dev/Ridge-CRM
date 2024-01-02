// MUI
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// utils
import getDateToday from "@utils/date/get-date-today";
import Errors from "./errors";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import styled from "@emotion/styled";

const today = getDateToday();

const Component = styled(Box)`
  width: 100%;
  margin-bottom: -3px;
`;

const DatePickerStyled = ({
  register,
  name,
  label,
  value,
  onChange,
  errors = null,
  disabled = false,
  minDate = today,
  maxDate = null,
  isEditMode = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Component>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          {...register(name)}
          label={label}
          value={value}
          onChange={onChange}
          error={!!errors}
          minDate={!isEditMode ? minDate : null}
          maxDate={maxDate}
          disabled={disabled}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors ? colors.error["red"] : "gray",
              },
              "&.Mui-focused fieldset": {
                borderColor: errors ? "red" : "green",
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
      <Errors errors={errors} padding="0 0 0 10px" />
    </Component>
  );
};

export default DatePickerStyled;
