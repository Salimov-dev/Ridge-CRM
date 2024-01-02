// MUI
import { InputAdornment } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
// components
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
import { FieldsContainer, Form } from "../styled/styled";
import SimpleSwitch from "../../inputs/simple-switch";
import AutocompleteStyled from "../../inputs/autocomplete-styled";
import getDateToday from "@utils/date/get-date-today";

const MeetingForm = ({
  data,
  objects,
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
            label="Дата встречи *"
            value={data?.date || null}
            onChange={(value) => setValue("date", value)}
            errors={errors?.date}
            minDate={getDateToday()}
          />
          <TimePickerStyled
            register={register}
            label="Время встречи *"
            name="time"
            value={data?.time}
            setValue={setValue}
            errors={errors?.time}
          />
          <SimpleSelectField
            register={register}
            name="meetingType"
            labelId="meetingType"
            label="Тип встречи *"
            itemsList={meetingTypes}
            value={watchTypeMeeting}
            errors={errors?.meetingType}
          />
          <SimpleSelectField
            register={register}
            name="status"
            labelId="status"
            label="Статус *"
            itemsList={statuses}
            value={watchStatus}
            errors={errors?.status}
          />
        </FieldsContainer>

        <FieldsContainer>
          <AutocompleteStyled
            label="Объект"
            register={register}
            name="objectId"
            options={objects}
            value={data.objectId}
            setValue={setValue}
            watchItemId={watchObjectId}
            disabled={!!watchObjectId}
            optionLabel={(option) =>
              `${option?.location?.city}, ${option?.location?.address}`
            }
          />

          <TextFieldStyled
            register={register}
            label="Комментарий *"
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
            label="Результат *"
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
