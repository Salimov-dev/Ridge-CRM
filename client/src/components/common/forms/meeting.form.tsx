// MUI
import { InputAdornment } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
// components
import getDateToday from "@utils/date/get-date-today";
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
import { FieldsContainer, Form } from "./styled/styled";
import TimePickerStyled from "../inputs/time-picker";
import DatePickerStyled from "../inputs/date-picker";
import AutocompleteStyled from "../inputs/autocomplete-styled";
import TextFieldStyled from "../inputs/text-field-styled";
import SimpleSwitch from "../inputs/simple-switch";

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
  const watchStatus = watch("status");
  const watchObjectId = watch("objectId");
  const watchTypeMeeting = watch("meetingType");
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
          <SelectFieldStyled
            label="Тип встречи"
            register={register}
            name="meetingType"
            labelId="meetingType"
            required={true}
            itemsList={meetingTypes}
            value={watchTypeMeeting ?? ""}
            errors={errors?.meetingType}
          />
          <SelectFieldStyled
            label="Статус"
            register={register}
            name="status"
            labelId="status"
            required={true}
            itemsList={statuses}
            value={watchStatus ?? ""}
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
            disabled={!isObjectPage}
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
