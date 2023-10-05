import { Autocomplete, FormHelperText, TextField } from "@mui/material";

const AutocompleteStyled = ({
  register,
  name,
  value,
  options,
  watchItemId,
  setValue,
  disabled = false,
  label,
  errors = null,
}) => {
  return (
    <>
    <Autocomplete
      {...register(name)}
      disablePortal
      id={name}
      options={options}
      value={
        value
          ? options.find((option) => {
              return value === option._id;
            }) ?? null
          : null
      }
      onChange={(event, newValue) =>
        setValue(name, newValue ? newValue._id : null)
      }
      
      renderInput={(params) => <TextField {...params} label={label} />}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option._id === value?._id}
      ListboxProps={{ style: { background: "#2f2f2f", maxHeight: "10rem" } }}
      disabled={disabled}
      sx={{
        width: "100%",
        "& .MuiInputLabel-root": {
          color: watchItemId ? "white" : "gray",
        },
        "&:focus-within": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "green !important",
          },
          "& .MuiInputLabel-root": {
            background: "inherit",
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
    />
    <FormHelperText sx={{ color: "Crimson" }}>
        {errors?.message}
      </FormHelperText>
      </>
  );
};

export default AutocompleteStyled;
