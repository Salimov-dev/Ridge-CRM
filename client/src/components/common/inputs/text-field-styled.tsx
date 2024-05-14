import { tokens } from "@theme/theme";
import { FC, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, TextField, styled, FormHelperText } from "@mui/material";
import { makeDigitSeparator } from "@utils/data/make-digit-separator";
import { UseFormRegister } from "react-hook-form";
import { ITheme } from "@interfaces/theme/theme.interface";
import ErrorsForInput from "./errors-for-input";

interface TextFieldStyledProps {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  value: string | null;
  rows?: string;
  errors?: any;
  multiline?: boolean;
  InputProps?: any;
  inputProps?: any;
  valueAsNumber?: boolean;
  disabled?: boolean;
  isHelperText?: boolean;
  subtitle?: string;
  required?: boolean;
  type?: "text" | "password" | "number" | "search";
}

interface StyledTextFieldProps {
  colors: ITheme;
}

const StyledTextField = styled(TextField)(
  ({ colors }: StyledTextFieldProps) => ({
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
  })
);

const TextFieldStyled: FC<TextFieldStyledProps> = ({
  register,
  label,
  name,
  value: initialValue = null,
  rows = "1",
  multiline = false,
  errors = null,
  InputProps = {},
  inputProps = {},
  valueAsNumber = false,
  disabled = false,
  isHelperText = false,
  subtitle = "",
  required = false,
  type = "text"
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
        id={name}
        value={value}
        label={label}
        rows={rows}
        InputProps={InputProps}
        inputProps={{ ...inputProps }}
        multiline={multiline}
        error={!!errors}
        disabled={disabled}
        required={required}
        colors={colors}
        type={type}
      />
      {isHelperText ? <FormHelperText>{subtitle}</FormHelperText> : null}
      <ErrorsForInput errors={errors} padding="0 0 0 10px" />
    </Box>
  );
};

export default TextFieldStyled;
