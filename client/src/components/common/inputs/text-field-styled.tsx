import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, TextField, styled, FormHelperText } from "@mui/material";
import { tokens } from "@theme/theme";
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

  const [value, setValue] = useState(initialValue); // Используем локальный state для значения

  // Функция для обработки введенных значений с десятичной точкой
  const handleChange = (event) => {
    let newValue = event.target.value;

    // Если значение должно быть числом и введено не число, просто обновляем состояние
    if (valueAsNumber && isNaN(Number(newValue))) {
      setValue(newValue);
      return;
    }

    // Если valueAsNumber=true, исключаем все символы кроме цифр и точки
    if (valueAsNumber) {
      newValue = newValue.replace(/[^\d.]/g, "");
    }

    // Если newValue пустая строка, устанавливаем значение в null
    if (newValue === "") {
      setValue("");
    } else {
      // Иначе, обновляем значение поля ввода
      setValue(newValue);
    }
  };

  // Эффект, который применяет разделение разрядов к значению поля ввода, если необходимо
  useEffect(() => {
    if (valueAsNumber) {
      setValue(makeDigitSeparator(initialValue));
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
        inputProps={{ ...inputProps, onChange: handleChange }}
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
