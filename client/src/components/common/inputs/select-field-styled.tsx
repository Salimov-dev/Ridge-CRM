import { orderBy } from "lodash";
import {
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import Errors from "./components/errors";

const StyledSelect = styled(Select)(({ theme, colors, items }) => ({
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.green["green"],
    },
  },
  "& .MuiSelect-select": {
    marginTop: "-5px",
    height: "24px !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: items ? colors.green["green"] : colors.grey[400],
  },
  "& .MuiInputLabel-root": {
    color: items ? "white" : colors.grey[400],
  },
  zIndex: theme.zIndex.modal + 1,
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: "gray !important",
  "&.Mui-focused": {
    color: "white !important",
  },
  zIndex: theme.zIndex.modal + 1,
}));

const SelectFieldStyled = ({
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
      <StyledInputLabel required={required} id={labelId}>
        {label}
      </StyledInputLabel>

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
        items={selectedItems}
        colors={colors}
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
      <Errors errors={errors} />
    </FormControl>
  );
};

export default SelectFieldStyled;
