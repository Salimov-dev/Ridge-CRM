import { Box } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const TimePickerStyled = ({ register, data, errors, setValue, name }) => {
  return (
    <Box sx={{ width: "100%", marginBottom: "-3px", marginTop: "-8px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DemoContainer
          components={["TimePicker"]}
          sx={{
            paddingTop: "8px",
          }}
        >
          <TimePicker
            {...register(name)}
            label="Basic time picker"
            ampm={false}
            onChange={(value) => setValue(name, value)}
            errors={errors?.time}
            value={data.time}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "green",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& label.Mui-focused": {
                color: "white",
              },
              "& .MuiButtonBase-root": {
                color: "white",
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};

export default TimePickerStyled;
