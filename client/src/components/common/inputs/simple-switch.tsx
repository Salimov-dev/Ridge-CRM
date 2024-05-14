import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  SelectChangeEvent,
  Switch,
  styled
} from "@mui/material";
import { FC, useState } from "react";

interface SimpleSwitchProps {
  title: string;
  onChange: (e: SelectChangeEvent<any>) => void;
  value: boolean | undefined;
  whiteSpace?: string;
  padding?: string;
  disabled?: boolean;
}

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const FormControlSyled = styled(FormControl)`
  display: flex;
  justify-content: start;
`;

const SimpleSwitch: FC<SimpleSwitchProps> = ({
  title,
  onChange,
  value,
  whiteSpace = "nowrap",
  padding = "5px 15px 5px 0px",
  disabled = false
}): JSX.Element => {
  const [checked, setChecked] = useState(value);

  const handleChange = (event: SelectChangeEvent<any>) => {
    const target = event.target as HTMLInputElement;
    setChecked(target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Component>
      <FormControlSyled sx={{ padding: padding }}>
        <FormGroup aria-label="position" row sx={{ width: "100%" }}>
          <FormControlLabel
            control={
              <Switch
                color="success"
                checked={value}
                disabled={disabled}
                onChange={handleChange}
              />
            }
            label={title}
            labelPlacement="start"
            sx={{
              width: "100%",
              whiteSpace: whiteSpace,
              color: checked ? "white" : "gray"
            }}
          />
        </FormGroup>
      </FormControlSyled>
    </Component>
  );
};

export default SimpleSwitch;
