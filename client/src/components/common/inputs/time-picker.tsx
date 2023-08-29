import { Box, FormHelperText, styled } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: "center";
  gap: 4px;
`;

const TimePickerStyled = ({ register, data, errors, setValue, name, label }) => {
  return (
    <FieldsContainer>
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
            label={label}
            ampm={false}
            onChange={(value) => setValue(name, value)}
            errors={errors?.time}
            value={data?.time}
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
            }}
          />
        </DemoContainer>
          <FormHelperText sx={{ color: "red" }}>
            {errors?.message}
          </FormHelperText>
      </LocalizationProvider>
    </Box>
    </FieldsContainer>
    
  );
};

export default TimePickerStyled;
