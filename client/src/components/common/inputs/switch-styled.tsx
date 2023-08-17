import { FormControlLabel, Switch } from "@mui/material";

const SwitchStyled = ({ register, label, name }) => {
  return (
    <FormControlLabel
      {...register(name)}
      control={<Switch />}
      label={label}
      sx={{
        width: "fit-content",
        "& .MuiButtonBase-root.Mui-checked": {
          color: "green",
        },
        "& .MuiSwitch-track": {
          backgroundColor: "gray !important"
        },
      }}
    />
  );
};

export default SwitchStyled;
