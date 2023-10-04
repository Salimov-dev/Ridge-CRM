// MUI
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
// components
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
import { FieldsContainer, Form } from "../styled/styled";
import SimpleSwitch from "../../inputs/simple-switch";
import AutocompleteStyled from "../../inputs/autocomplete-styled";

const MeetingForm = ({
  data,
  objects = [],
  statuses,
  meetingTypes,
  watch,
  register,
  errors,
  setValue,
  isEditMode = false,
  isMeetingsLoading = false,
  isObjectPage = false,
}) => {
  const watchStatus = watch("status", "");
  const watchObjectId = watch("objectId", "");
  const watchTypeMeeting = watch("meetingType", "");
  const watchIsDone = watch("isDone", false);

  return (
    <>
      <Form noValidate>
        <FieldsContainer>
          <DatePickerStyled
            register={register}
            name="date"
            label="Дата встречи"
            value={data?.date}
            onChange={(value) => setValue("date", value)}
          />
          <TimePickerStyled
            register={register}
            label="Время встречи"
            name="time"
            value={data?.time}
            setValue={setValue}
          />
          <SimpleSelectField
            register={register}
            name="meetingType"
            labelId="meetingType"
            label="Тип встречи"
            itemsList={meetingTypes}
            value={watchTypeMeeting}
            errors={errors?.meetingType}
          />
          <SimpleSelectField
            register={register}
            name="status"
            labelId="status"
            label="Статус"
            itemsList={statuses}
            value={watchStatus}
            errors={errors?.status}
          />
        </FieldsContainer>

        <FieldsContainer>
          <AutocompleteStyled
            register={register}
            name="objectId"
            options={objects}
            value={data?.objectId || null}
            setValue={setValue}
            watchItemId={watchObjectId}
          />

          <TextFieldStyled
            register={register}
            label="Комментарий"
            name="comment"
            errors={errors?.comment}
            value={data?.comment}
            onInputQuantities={150}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreateIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>
        {isEditMode ? (
          <TextFieldStyled
            register={register}
            label="Результат"
            name="result"
            value={data?.result}
            rows="2"
            multiline={true}
            onInputQuantities={100}
          />
        ) : null}

        {isEditMode ? (
          <SimpleSwitch
            title="Встреча выполненна"
            value={watchIsDone}
            isLoading={isMeetingsLoading}
            onChange={(e) => {
              setValue("isDone", e.target.checked);
            }}
          />
        ) : null}
      </Form>
    </>
  );
};

export default MeetingForm;
