import {
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  OutlinedInput,
  ListItemText,
} from "@mui/material";

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

const StyledSelect = styled(Select)(() => ({
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
}));

const MultiSelectField = ({
  onChange,
  itemsList,
  selectedItems,
  name,
  labelId,
  label,
  disabled = false
}) => {
  function checkArrayElements(arr) {
    for (const element of arr) {
      if (typeof element !== "string") {
        return true;
      }
    }
    return false;
  }

  const itemsWithId = checkArrayElements(itemsList);

  const selectedItemsArray = Array.isArray(selectedItems) ? selectedItems : []

  return (
    <FormControl sx={{ minWidth: "100px", width: "100%" }}>
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
        labelId={labelId}
        id={name}
        name={name}
        multiple
        value={selectedItemsArray}
        onChange={onChange}
        disabled={disabled}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => {
          const uniqueSelected = [...new Set(selected)];
          const selectedItemsNames = uniqueSelected?.map((elementID) => {
            const item = itemsList?.find((item) => item?._id === elementID);
            return item ? item?.name : "";
          });
          return itemsWithId
            ? selectedItemsNames?.join(", ")
            : uniqueSelected?.join(", ");
        }}
        MenuProps={MenuProps}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: selectedItems?.length ? "green" : "gray",
          },
          "& .MuiInputLabel-root": {
            color: selectedItems?.length ? "white" : "gray",
          },
        }}
      >
        {itemsList?.map((item, index) =>
          itemsWithId ? (
            <MenuItem key={`item-${item?._id}`} value={item?._id}>
              <Checkbox
                key={`checkbox-${item?._id}`} // Ensure a unique key for the Checkbox
                checked={selectedItems?.indexOf(item?._id) > -1}
                sx={{ color: "white !important" }}
              />
              <ListItemText
                key={`text-${item?._id}`} // Ensure a unique key for the ListItemText
                primary={item?.name}
              />
            </MenuItem>
          ) : (
            <MenuItem key={`item-${index}`} value={item}>
              <Checkbox
                key={`checkbox-${index}`} // Ensure a unique key for the Checkbox
                checked={selectedItems?.indexOf(item) > -1}
                sx={{ color: "white !important" }}
              />
              <ListItemText
                key={`text-${index}`} // Ensure a unique key for the ListItemText
                primary={item}
              />
            </MenuItem>
          )
        )}
      </StyledSelect>
    </FormControl>
  );
};

export default MultiSelectField;
