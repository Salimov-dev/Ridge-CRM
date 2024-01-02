import { Box, FormHelperText, styled } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Errors from "./errors";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: "center";
  gap: 4px;
`;

const TimePickerStyled = ({
  register,
  label,
  name,
  value,
  setValue,
  errors = null,
  disabled = false,
  isHelperText = false,
  required = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const helperText = errors?.message; // Добавляем переменную helperText

  return (
    <FieldsContainer>
      <Box sx={{ width: "100%", marginBottom: "-3px", marginTop: "-8px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <DemoContainer
            components={["TimePicker"]}
            sx={{
              paddingTop: "8px",
            }}
          >
            <TimePicker
              {...register(name, { required: required })}
              label={label}
              ampm={false}
              onChange={(value) => setValue(name, value)}
              error={!!errors}
              value={value}
              required={required}
              helperText={helperText} // Используем переменную helperText
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
          </DemoContainer>
          {isHelperText ? <FormHelperText>{helperText}</FormHelperText> : null}
        </LocalizationProvider>
        <Errors errors={errors} padding="0 0 0 10px" />
      </Box>
    </FieldsContainer>
  );
};

export default TimePickerStyled;
