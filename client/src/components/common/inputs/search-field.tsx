import { TextField, styled } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { FC } from "react";

type Value = string | string[] | null;

interface SearchFieldProps {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  value: Value;
  inputProps: any;
  disabled: boolean;
}

const StyledTextField = styled(TextField)<{ value?: Value }>(
  ({ theme, value }) => ({
    minWidth: "30px",
    width: "100%",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
      color: "white"
    },
    "& .MuiInputLabel-root": {
      color: value?.length ? "white" : "gray",
      "&.Mui-focused": {
        color: "white"
      }
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
      backgroundColor: theme.palette.background.default,
      padding: "0 5px"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: value?.length ? "green" : "gray"
    }
  })
);

const SearchField: FC<SearchFieldProps> = ({
  register,
  label,
  name,
  value,
  inputProps,
  disabled = false
}) => {
  return (
    <StyledTextField
      {...register(name)}
      label={label}
      type="search"
      variant="outlined"
      id={name}
      name={name}
      value={value}
      disabled={disabled}
      inputProps={inputProps}
    />
  );
};

export default SearchField;
