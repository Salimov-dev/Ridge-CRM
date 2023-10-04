import { Autocomplete, TextField } from "@mui/material";

const AutocompleteStyled = ({
  register,
  name,
  value,
  options,
  watchItemId,
  setValue,
}) => {
  const handleChange = (event, newValue) => {
    setValue(name, newValue);
  };
  return (
    <Autocomplete
      {...register(name)}
      disablePortal
      value={value || null}
      onChange={handleChange}
      options={options}
      isOptionEqualToValue={(option, value) => option._id === value?._id}
      sx={{
        width: "100%",

        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: watchItemId ? "green" : "gray",
        },
        "& .MuiInputLabel-root": {
          color: watchItemId ? "white" : "gray",
        },
        "&:focus-within": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "green !important",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
        },
        "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
          backgroundColor: "#2f2f2f",
          "&:hover": {
            backgroundColor: "#3f3f3f",
          },
        },
        "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
          {
            backgroundColor: "#2a2b2e",
          },
        "& + .MuiAutocomplete-popper": {
          zIndex: 999999999999,
        },
      }}
      renderInput={(params) => <TextField {...params} label="Объект встречи" />}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
    />
  );
};

export default AutocompleteStyled;
