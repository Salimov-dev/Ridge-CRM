import { useNavigate } from "react-router-dom";
// MUI
import {
  Box,
  Button,
  styled,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// components
import TextFieldStyled from "../inputs/text-field-styled";
import SimpleSelectField from "../inputs/simple-select-field";
import DatePickerStyled from "../inputs/date-picker";

const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: "center";
  gap: 4px;
`;

const FooterButtons = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const MeetingForm = ({
  data,
  objects,
  statuses,
  register,
  errors,
  handleSubmit,
  onSubmit,
  setValue,
  isValid,
  isEditMode = false,
  isEmptyFindedObject,
}) => {
  const isValidAndHasAdress = Boolean(isEmptyFindedObject) && isValid;

  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate("/meetings");
    // navigate(isEditMode ? `/objects/${objectId}` : "/objects");
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        
        <Box sx={{ marginRight: "auto" }}>
          <h3>Встреча</h3>
        </Box>

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
                  {...register("time")}
                  label="Basic time picker"
                  ampm={false}
                  onChange={(value) => setValue("time", value)}
                  errors={errors?.time}
                  //   value={da}
                  //   onChange={onChange}
                  //   error={!!errors}
                  //   disabled={disabled}
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
                      //   color: value ? "white" : "gray",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <FormHelperText sx={{ color: "red" }}>
              {/* <FormHelperText sx={{ color: color }}> */}
              {/* {errors ? errors?.message : helperText} */}
            </FormHelperText>
          </Box>

          <DatePickerStyled
            register={register}
            name="date"
            label="Дата встречи"
            // value={data?.date}
            onChange={(value) => setValue("date", value)}
            errors={errors?.date}
          />
          <SimpleSelectField
            register={register}
            itemsList={statuses}
            name="status"
            labelId="status"
            label="Статус"
            errors={errors?.status}
          />
          <SimpleSelectField
            register={register}
            itemsList={objects}
            name="objectId"
            labelId="objectId"
            label="Объект встречи"
            errors={errors?.objectId}

          />
        </FieldsContainer>

        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Комментарий"
            name="comment"
            errors={errors?.comment}
            onInputQuantities={50}
            value={data?.comment}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>

        <FooterButtons>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            disabled={!isValidAndHasAdress}
          >
            {isEditMode ? "Сохранить" : "Создать"}
          </Button>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleBackPage}
            >
              Отмена
            </Button>
          </Box>
        </FooterButtons>
      </Form>
    </>
  );
};

export default MeetingForm;
