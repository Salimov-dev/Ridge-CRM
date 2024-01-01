import { orderBy } from "lodash";
import {
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
  FormHelperText,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";

const StyledSelect = styled(Select)(({ theme }) => ({
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
  "& .MuiSelect-select": {
    marginTop: "-5px",
    height: "24px !important",
  },
  zIndex: theme.zIndex.modal + 1,
}));

const SimpleSelectField = ({
  register,
  name,
  labelId,
  label,
  itemsList,
  required = false,
  value,
  disabled = false,
  errors = null,
  selectedItems = null,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const sortedItems = orderBy(itemsList, ["name"], ["asc"]);

  return (
    <FormControl sx={{ minWidth: "200px", width: "100%" }}>
      <InputLabel
        required={required}
        id={labelId}
        sx={{
          color: "gray !important",
          "&.Mui-focused": {
            color: "white !important",
          },
        }}
      >
        {label}
      </InputLabel>

      <StyledSelect
        {...register(name)}
        labelId={labelId}
        id={name}
        name={name}
        value={value || ""}
        input={<OutlinedInput label={label} />}
        disabled={disabled}
        defaultValue=""
        error={!!errors}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: selectedItems ? "green" : "gray",
          },
          "& .MuiInputLabel-root": {
            color: selectedItems ? "white" : "gray",
          },
        }}
      >
        <MenuItem value="">
          <em>Отмена</em>
        </MenuItem>
        {sortedItems?.map((item) => (
          <MenuItem key={item?._id} value={item?._id}>
            <ListItemText primary={item?.name} />
          </MenuItem>
        ))}
      </StyledSelect>
      <FormHelperText sx={{ color: colors.error["gold"] }}>
        {errors?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default SimpleSelectField;
