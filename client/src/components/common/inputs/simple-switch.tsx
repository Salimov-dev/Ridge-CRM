import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  styled,
} from "@mui/material";
import { useState } from "react";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const FormControlSyled = styled(FormControl)`
  padding: 5px 15px 5px 0px;
  display: flex;
  justify-content: start;
`;

const SimpleSwitch = ({
  title,
  onChange,
  value,
  whiteSpace = "nowrap",
  isLoading,
  initialChecked = false,
}) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Component>
      <FormControlSyled component="fieldset">
        <FormGroup aria-label="position" row sx={{ width: "100%" }}>
          <FormControlLabel
            control={
              <Switch
                color="success"
                checked={value}
                disabled={isLoading ? true : false}
                onChange={handleChange}
              />
            }
            label={title}
            labelPlacement="start"
            sx={{
              width: "100%",
              whiteSpace: whiteSpace,
              color: checked ? "white" : "gray",
            }}
          />
        </FormGroup>
      </FormControlSyled>
    </Component>
  );
};

export default SimpleSwitch;
