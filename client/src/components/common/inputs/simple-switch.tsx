import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  styled,
} from "@mui/material";

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
  checked,
  whiteSpace = "nowrap",
  isLoading,
}) => {
  return (
    <Component>
      <FormControlSyled component="fieldset">
        <FormGroup aria-label="position" row sx={{ width: "100%" }}>
          <FormControlLabel
            control={
              <Switch
                color="success"
                checked={checked}
                disabled={isLoading ? true : false}
                onChange={onChange}
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