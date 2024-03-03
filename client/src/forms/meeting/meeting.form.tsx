// MUI
import { InputAdornment } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
// components
import getDateToday from "@utils/date/get-date-today";
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
import { FieldsContainer, Form } from "../../components/common/forms/styled";
import TimePickerStyled from "../../components/common/inputs/time-picker";
import DatePickerStyled from "../../components/common/inputs/date-picker";
import AutocompleteStyled from "../../components/common/inputs/autocomplete-styled";
import TextFieldStyled from "../../components/common/inputs/text-field-styled";
import SimpleSwitch from "../../components/common/inputs/simple-switch";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";

const MeetingForm = ({
  data,
  objects,
  statuses,
  types,
  watch,
  register,
  errors,
  setValue,
  isEditMode = false,
  isMeetingsLoading = false,
  isObjectPage = false
}) => {
  const watchStatus = watch("status");
  const watchObjectId = watch("objectId");
  const watchTypeMeeting = watch("type");
  const watchIsDone = watch("isDone");

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
            name="type"
            labelId="type"
            required={true}
            itemsList={types}
            value={watchTypeMeeting ?? ""}
            errors={errors?.type}
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
            optionLabel={(option) => `${option?.city}, ${option?.address}`}
          />

          <TextFieldStyled
            register={register}
            label="Комментарий"
            name="comment"
            required={true}
            errors={errors?.comment}
            value={capitalizeFirstLetter(data?.comment)}
            onInputQuantities={150}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreateIcon />
                </InputAdornment>
              )
            }}
          />
        </FieldsContainer>
        {isEditMode ? (
          <TextFieldStyled
            register={register}
            label="Результат"
            name="result"
            value={capitalizeFirstLetter(data?.result)}
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
