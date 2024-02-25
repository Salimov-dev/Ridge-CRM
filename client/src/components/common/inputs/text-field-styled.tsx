import { useTheme } from "@emotion/react";
import { Box, TextField, styled, FormHelperText } from "@mui/material";
import { tokens } from "@theme/theme";
import { makeDigitSeparator } from "@utils/data/make-digit-separator";
import Errors from "./components/errors";
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";

const StyledTextField = styled(TextField)(({ colors }) => ({
  minWidth: "30px",
  width: "100%",
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: colors.green["green"],
    color: "white"
  },
  "& .MuiInputLabel-root": {
    color: colors.grey[400],
    "&.Mui-focused": {
      color: "white"
    }
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
    backgroundColor: "transparent",
    padding: "0 5px"
  }
}));

const TextFieldStyled = ({
  register,
  label,
  name,
  value = null,
  rows = "1",
  multiline = false,
  errors = null,
  InputProps = {},
  inputProps = {},
  type = "text",
  valueAsNumber = false,
  disabled = false,
  isHelperText = false,
  subtitle = "",
  required = false,
  isCapitalize = false
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const newValue = valueAsNumber
    ? value !== undefined && value !== null
      ? parseFloat(value.replace(/\s/g, "").replace(/,/g, ""))?.toLocaleString()
      : ""
    : isCapitalize && value !== undefined && value !== null
    ? capitalizeFirstLetter(value)
    : value;

  return (
    <Box sx={{ width: "100%" }}>
      <StyledTextField
        {...register(name)}
        variant="outlined"
        type={type}
        id={name}
        value={newValue}
        label={label}
        rows={rows}
        InputProps={InputProps}
        inputProps={inputProps}
        multiline={multiline}
        error={!!errors}
        subtitle={errors?.message}
        disabled={disabled}
        required={required}
        onWheel={(e) => e.target.blur()}
        colors={colors}
      />
      {isHelperText ? <FormHelperText>{subtitle}</FormHelperText> : null}
      <Errors errors={errors} padding="0 0 0 10px" />
    </Box>
  );
};

export default TextFieldStyled;
