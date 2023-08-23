import { useNavigate } from "react-router-dom";
// MUI
import { Box, Button, styled, InputAdornment } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
// components
import TextFieldStyled from "../inputs/text-field-styled";
import SimpleSelectField from "../inputs/simple-select-field";
import DatePickerStyled from "../inputs/date-picker";
import TimePickerStyled from "../inputs/time-picker";

const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  marginTop: "12px",
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
  meetingTypes,
  register,
  errors,
  handleSubmit,
  onSubmit,
  setValue,
  isValid,
  isEditMode = false,
  isEmptyFindedObject,
  watchObjectId,
  watchStatus,
  watchTypeMeeting,
}) => {
  const isValidAndHasAdress = Boolean(!isEmptyFindedObject) && isValid;

  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate("/meetings");
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldsContainer>
          <DatePickerStyled
            register={register}
            name="date"
            label="Дата встречи"
            value={data?.date}
            onChange={(value) => setValue("date", value)}
            errors={errors?.date}
          />
          <TimePickerStyled
            register={register}
            data={data}
            errors={errors?.time}
            setValue={setValue}
            name="time"
            label="Время встречи"
          />
          <SimpleSelectField
            register={register}
            itemsList={meetingTypes}
            name="meetingType"
            labelId="meetingType"
            label="Тип встречи"
            value={watchTypeMeeting}
            errors={errors?.meetingType}
          />
          <SimpleSelectField
            register={register}
            itemsList={statuses}
            name="status"
            labelId="status"
            label="Статус"
            value={watchStatus}
            errors={errors?.status}
          />
        </FieldsContainer>

        <FieldsContainer>
          <SimpleSelectField
            register={register}
            itemsList={objects}
            name="objectId"
            labelId="objectId"
            label="Объект встречи"
            value={watchObjectId}
            errors={errors?.objectId}
          />
          <TextFieldStyled
            register={register}
            label="Комментарий"
            name="comment"
            errors={errors?.comment}
            value={data?.comment}
            onInputQuantities={50}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreateIcon />
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
