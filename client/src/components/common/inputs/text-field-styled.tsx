import {Box, TextField, styled, FormHelperText } from "@mui/material";
const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: "30px",
  width: "100%",
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "green",
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "gray",
    "&.Mui-focused": {
      color: "white",
    },
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
    backgroundColor: theme.palette.background.default,
    padding: "0 5px",
  },
}));

const TextFieldStyled = ({
  errors,
  register,
  label,
  name,
  onKeyDown,
  value,
  InputProps,
  inputProps,
  type,
  rows = "1",
  onInputQuantities,
  valueAsNumber = false,
  disabled = false,
  multiline = false,
  isHelperText = false,
  helperText,
}) => {
  const handleInputCrop = (e, num) => {
    const maxLength = num;
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };
  return (
    <Box sx={{width: '100%'}}>
    <StyledTextField
      {...register(name, {
        valueAsNumber: valueAsNumber,
      })}
      variant="outlined"
      type={type}
      id={name}
      value={value}
      label={label}
      rows={rows}
      onKeyDown={onKeyDown}
      InputProps={InputProps}
      inputProps={inputProps}
      multiline={multiline}
      error={!!errors}
      helperText={errors?.message}
      disabled={disabled}
      onInput={(e) => handleInputCrop(e, onInputQuantities)}
      sx={{
        "& .MuiInputLabel-root": {
          color: value?.length ? "white" : "gray",
        },
      }}
    />
    {isHelperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </Box>
    
  );
};

export default TextFieldStyled;
