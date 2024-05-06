import { FC } from "react";
import {
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  OutlinedInput,
  ListItemText,
  SelectChangeEvent
} from "@mui/material";

interface MultiSelectFieldProps {
  onChange: (e: SelectChangeEvent<any>) => void;
  itemsList: IItem[];
  selectedItems: string[];
  name: string;
  labelId: string;
  label: string;
  disabled?: boolean;
  isItemValueId?: boolean;
  minWidth?: string;
}

interface IItem {
  _id: string;
  name: string;
}

const StyledSelect = styled(Select)(() => ({
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    }
  }
}));

const MultiSelectField: FC<MultiSelectFieldProps> = ({
  onChange,
  itemsList,
  selectedItems,
  name,
  labelId,
  label,
  disabled = false,
  isItemValueId = true,
  minWidth = "100px"
}): JSX.Element => {
  const itemsWithId: boolean = checkArrayElements(itemsList);
  const selectedItemsArray: string[] = Array.isArray(selectedItems)
    ? selectedItems
    : [];

  function checkArrayElements(arr: unknown[]): boolean {
    for (const element of arr) {
      if (typeof element !== "string") {
        return true;
      }
    }
    return false;
  }

  return (
    <FormControl sx={{ minWidth: minWidth, width: "100%" }}>
      <InputLabel
        id={labelId}
        sx={{
          color: "gray !important",
          "&.Mui-focused": {
            color: "white !important"
          }
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
        renderValue={(selected: string[] | unknown) => {
          const uniqueSelected = [...new Set(selected as string[])];
          const selectedItemsNames = uniqueSelected?.map((elementID) => {
            const item = itemsList?.find(
              (item: IItem) =>
                (isItemValueId ? item?._id : item?.name) === elementID
            );
            return item ? item?.name : "";
          });
          return itemsWithId
            ? selectedItemsNames?.join(", ")
            : uniqueSelected?.join(", ");
        }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: selectedItems?.length ? "green" : "gray"
          },
          "& .MuiInputLabel-root": {
            color: selectedItems?.length ? "white" : "gray"
          }
        }}
      >
        {itemsList?.map((item: IItem, index: number) =>
          itemsWithId ? (
            <MenuItem
              key={`item-${item?._id}`}
              value={isItemValueId ? item?._id : item?.name}
            >
              <Checkbox
                key={`checkbox-${item?._id}`}
                checked={
                  selectedItems?.indexOf(
                    isItemValueId ? item?._id : item?.name
                  ) > -1
                }
                sx={{ color: "white !important" }}
              />
              <ListItemText
                key={`text-${item?._id}`}
                primary={<span>{item?.name}</span>}
              />
            </MenuItem>
          ) : (
            <MenuItem key={`item-${index}`} value={item?.name}>
              <Checkbox
                key={`checkbox-${index}`}
                checked={selectedItems?.indexOf(item.name) > -1}
                sx={{ color: "white !important" }}
              />
              <ListItemText key={`text-${index}`} primary={<span>item</span>} />
            </MenuItem>
          )
        )}
      </StyledSelect>
    </FormControl>
  );
};

export default MultiSelectField;
