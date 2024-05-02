import { tokens } from "@theme/theme";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, TextField, styled, FormHelperText } from "@mui/material";
import { makeDigitSeparator } from "@utils/data/make-digit-separator";

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
  value: initialValue = null,
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
  required = false
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState<string | null>(initialValue);

  useEffect(() => {
    if (valueAsNumber) {
      const formatedData = makeDigitSeparator(initialValue);
      setValue(formatedData);
    } else {
      setValue(initialValue);
    }
  }, [initialValue, valueAsNumber]);

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
        inputProps={{ ...inputProps }}
        multiline={multiline}
        error={!!errors}
        subtitle={errors?.message}
        disabled={disabled}
        required={required}
        onWheel={(e) => e.target.blur()}
        colors={colors}
      />
      {isHelperText ? <FormHelperText>{subtitle}</FormHelperText> : null}
      <FormHelperText sx={{ color: "yellow", paddingLeft: "10px" }}>
        {errors?.message}
      </FormHelperText>
    </Box>
  );
};

export default TextFieldStyled;
