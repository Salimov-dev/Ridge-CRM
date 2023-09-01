import { TextField, styled } from "@mui/material";

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

const SearchField = ({
  register,
  label,
  name,
  value,
  inputProps,
  disabled = false,
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
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: value?.length ? "green" : "gray",
        },
        "& .MuiInputLabel-root": {
          color: value?.length ? "white" : "gray",
        },
      }}
    />
  );
};

export default SearchField;
