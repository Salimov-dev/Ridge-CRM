import { orderBy } from "lodash";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import ErrorsForInput from "./errors-for-input";
import {
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
  Theme
} from "@mui/material";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { ITheme } from "@interfaces/theme/theme.interface";

interface SelectFieldStyledProps {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  labelId: string;
  required?: boolean;
  itemsList?: Record<string, any>;
  value: string | null;
  errors?: any;
  disabled?: boolean;
  selectedItems?: string[];
}

interface StyledSelectProps {
  theme: ITheme;
  colors: ITheme;
}

interface StyledInputLabelProps {
  theme: Theme;
}

const StyledSelect = styled(Select)(({ theme, colors }: StyledSelectProps) => ({
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.green["green"]
    }
  },
  "& .MuiSelect-select": {
    marginTop: "-5px",
    height: "24px !important"
  },

  zIndex: theme.zIndex.modal + 1
}));

const StyledInputLabel = styled(InputLabel)(
  ({ theme }: StyledInputLabelProps) => ({
    color: "gray !important",
    "&.Mui-focused": {
      color: "white !important"
    },
    zIndex: theme.zIndex.modal + 1
  })
);

const SelectFieldStyled: FC<SelectFieldStyledProps> = ({
  register,
  name,
  labelId,
  label,
  itemsList,
  required = false,
  value,
  disabled = false,
  errors = null
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const sortedItems = orderBy(itemsList, ["name"], ["asc"]);

  return (
    <FormControl sx={{ minWidth: "200px", width: "100%" }}>
      <StyledInputLabel required={required} id={labelId} theme={theme}>
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
      <ErrorsForInput errors={errors} />
    </FormControl>
  );
};

export default SelectFieldStyled;
