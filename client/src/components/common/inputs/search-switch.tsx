import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";

const SearchSwitch = ({
  title = "switch",
  checked,
  isLoading,
  isChecked,
  onChange,
  whiteSpace = "none",
  height='100%',
  margin="0"
}) => {
  return (
    <Box>
      <FormControl
        component="fieldset"
        sx={{
          height: height,
          margin: margin,
          padding: "5px 15px 5px 0px",
          border: "1px solid",
          borderColor: isChecked ? "green" : "gray",
          borderRadius: "6px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <FormGroup aria-label="position" row sx={{ width: "100%" }}>
          <FormControlLabel
            control={
              <Switch
                color="success"
                checked={checked} // Set the initial value here
                disabled={isLoading ? true : false}
                onChange={onChange}
              />
            }
            label={title}
            labelPlacement="start"
            sx={{
              width: "100%",
              whiteSpace: whiteSpace,
              color: isChecked ? "white" : "gray",
            }}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default SearchSwitch;
