import { useTheme } from "@emotion/react";
import { Box, TextField, styled, FormHelperText } from "@mui/material";
import { tokens } from "@theme/theme";
import { makeDigitSeparator } from "@utils/data/make-digit-separator";
import Errors from "./components/errors";

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
  onInputQuantities = 50,
  InputProps = {},
  inputProps = {},
  type = "text",
  valueAsNumber = false,
  disabled = false,
  isHelperText = false,
  subtitle = "",
  required = false
  // onChange = () => {}
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleInput = (e) => {
    const maxLength = onInputQuantities;
    let inputValue = e.target.value;

    if (valueAsNumber) {
      inputValue = makeDigitSeparator(inputValue);
    }

    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    e.target.value = inputValue;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyledTextField
        {...register(name)}
        variant="outlined"
        type={type}
        id={name}
        value={value}
        label={label}
        rows={rows}
        InputProps={InputProps}
        inputProps={inputProps}
        multiline={multiline}
        error={!!errors}
        // onChange={onChange}
        subtitle={errors?.message}
        disabled={disabled}
        required={required}
        // onInput={(e) => handleInput(e)}
        onWheel={(e) => e.target.blur()}
        colors={colors}
      />
      {isHelperText ? <FormHelperText>{subtitle}</FormHelperText> : null}
      <Errors errors={errors} padding="0 0 0 10px" />
    </Box>
  );
};

export default TextFieldStyled;
