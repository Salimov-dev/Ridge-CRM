import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";

const SearchSwitch = ({ data, isLoading, isOnlyPhoneChecked, onChange }) => {
  return (
    <Box>
      <FormControl
        component="fieldset"
        sx={{
          padding: "5px 15px 5px 0px",
          border: "1px solid",
          borderColor: isOnlyPhoneChecked ? "green" : "gray",
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
                checked={data.onlyWithPhone} // Set the initial value here
                disabled={isLoading ? true : false}
                onChange={onChange}
              />
            }
            label="Объекты с телефоном"
            labelPlacement="start"
            sx={{
              width: "100%",
              color: isOnlyPhoneChecked ? "white" : "gray",
            }}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default SearchSwitch;
