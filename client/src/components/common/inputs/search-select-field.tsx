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

const StyledSelect = styled(Select)(() => ({
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
  "& .MuiSelect-select": {
    marginTop: "-5px",
    height: "24px !important",
  },
}));

const SearchSelectField = ({
  register,
  name,
  labelId,
  label,
  itemsList,
  errors = null,
  disabled = false,
  value,
  isSelect = false,
}) => {
  const sortedItems = orderBy(itemsList, ["name"], ["asc"]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControl sx={{ minWidth: "200px", width: "100%" }}>
      <InputLabel
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
        MenuProps={MenuProps}
        disabled={disabled}
        defaultValue=""
        error={!!errors}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: isSelect ? "green" : "gray",
          },
          "& .MuiInputLabel-root": {
            color: isSelect ? "white" : "gray",
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
      <FormHelperText sx={{ color: "Crimson" }}>
        {errors?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default SearchSelectField;
