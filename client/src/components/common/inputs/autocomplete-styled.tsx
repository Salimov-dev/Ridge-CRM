import styled from "@emotion/styled";
import { Autocomplete, Box, FormHelperText, TextField } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AutocompleteStyled = ({
  register,
  name,
  value,
  options,
  watchItemId,
  setValue,
  required = false,
  disabled = false,
  label,
  errors = null,
  width = "100%",
  optionLabel = (option) => option.name,
}) => {
  return (
    <Component>
      <Autocomplete
        {...register(name)}
        disablePortal
        id={name}
        options={options}
        required={required}
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
        // getOptionLabel={(option) => option._id}
        getOptionLabel={optionLabel}
        isOptionEqualToValue={(option, value) => option._id === value?._id}
        ListboxProps={{ style: { background: "#2f2f2f", maxHeight: "10rem" } }}
        disabled={disabled}
        noOptionsText="Нет совпадений"
        clearOnBlur={false}
        clearIcon={null}
        sx={{
          width: width,
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
              background: "inherit",
              color: "white",
            },
          },
          "&:not(:focus-within)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: errors ? "yellow !important" : "gray !important",
            },
            "& .MuiInputLabel-root": {
              color: "gray",
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
      <FormHelperText sx={{ color: "yellow" }}>
        {errors?.message}
      </FormHelperText>
    </Component>
  );
};

export default AutocompleteStyled;
