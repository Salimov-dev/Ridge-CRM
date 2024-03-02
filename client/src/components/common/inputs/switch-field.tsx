import { FormControlLabel, Switch } from "@mui/material";

const SwitchField = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      label="Bottom"
      labelPlacement="bottom"
      sx={{ width: "112px", margin: "0" }}
      control={
        <Switch
          checked={checked}
          color="default"
          onChange={onChange}
          inputProps={{ "aria-label": "controlled" }}
          sx={{
            marginTop: "-10px",
            "& .Mui-checked": {
              color: "LimeGreen" // Задаем кастомный цвет для свитча в состоянии "включено"
            },
            "& .Mui-checked + .MuiSwitch-track": {
              backgroundColor: "LimeGreen" // Задаем кастомный цвет для фона свитча в состоянии "включено"
            }
          }}
        />
      }
      label={label}
    />
  );
};

export default SwitchField;
