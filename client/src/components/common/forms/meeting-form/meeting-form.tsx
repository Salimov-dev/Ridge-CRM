// MUI
import { Box, styled, InputAdornment } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
// components
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
import FooterButtons from "../footer-buttons/footer-buttons";

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
  justify-content: space-between;
  align-items: "center";
  gap: 4px;
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
  onClose,
  setValue,
  isValid,
  isEditMode = false,
  isEmptyFindedObject,
  watch,
}) => {
  const isValidAndHasAdress = Boolean(!isEmptyFindedObject) && isValid;
  const watchStatus = watch("status", "");
  const watchObjectId = watch("objectId", "");
  const watchTypeMeeting = watch("meetingType", "");

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

        <FooterButtons
          isEditMode={isEditMode}
          isValid={!isValidAndHasAdress}
          onClose={onClose}
        />
      </Form>
    </>
  );
};

export default MeetingForm;
