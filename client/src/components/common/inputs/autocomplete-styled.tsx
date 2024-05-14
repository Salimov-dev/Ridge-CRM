import { FC } from "react";
import styled from "@emotion/styled";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Autocomplete, Box, TextField } from "@mui/material";
import ErrorsForInput from "./errors-for-input";

interface AutocompleteStyledProps {
  register: UseFormRegister<any>;
  name: string;
  value: string | null;
  options: any;
  watchItemId: string;
  setValue: UseFormSetValue<any>;
  disabled?: boolean;
  label: string;
  errors: any;
  width?: string;
  maxHeightListBox?: string;
  optionLabel?: any;
}

interface StyledAutocompleteProps {
  errors: any;
  watchitemid: string;
  width: string;
}

const StyledAutocomplete = styled(Autocomplete)<StyledAutocompleteProps>(
  ({ errors, watchitemid, width }) => ({
    width: width,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: watchitemid ? "green" : "gray"
    },
    "& .MuiInputLabel-root": {
      color: watchitemid ? "white" : "gray"
    },
    "&:focus-within": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "green !important"
      },
      "& .MuiInputLabel-root": {
        background: "inherit",
        color: "white"
      }
    },
    "&:not(:focus-within)": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: errors ? "red !important" : "gray !important"
      },
      "& .MuiInputLabel-root": {
        color: "gray"
      }
    },
    "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
      backgroundColor: "#2f2f2f",
      "&:hover": {
        backgroundColor: "#3f3f3f"
      }
    },
    "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
      {
        backgroundColor: "#2a2b2e"
      },
    "& + .MuiAutocomplete-popper": {
      zIndex: 999999999999
    }
  })
);

const Component = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AutocompleteStyled: FC<AutocompleteStyledProps> = ({
  register,
  name,
  value,
  options,
  watchItemId,
  setValue,
  disabled = false,
  label,
  errors = null,
  width = "100%",
  maxHeightListBox = "12rem",
  optionLabel = (option: any) => option.name
}) => {
  return (
    <Component>
      <StyledAutocomplete
        {...register(name)}
        disablePortal
        id={name}
        options={options}
        watchitemid={watchItemId}
        width={width}
        errors={errors}
        disabled={disabled}
        noOptionsText="Нет совпадений"
        clearOnBlur={false}
        clearIcon={null}
        renderInput={(params) => <TextField {...params} label={label} />}
        getOptionLabel={optionLabel}
        isOptionEqualToValue={(option: any, value: any) =>
          option._id === value?._id
        }
        onChange={(event, newValue: any) =>
          setValue(name, newValue ? newValue._id : null)
        }
        ListboxProps={{
          style: { background: "#2f2f2f", maxHeight: maxHeightListBox }
        }}
        value={
          value
            ? options.find((option: any) => {
                return value === option._id;
              }) ?? null
            : null
        }
      />
      <ErrorsForInput errors={errors} padding="0 0 0 10px" />
    </Component>
  );
};

export default AutocompleteStyled;
