// components
import TextFieldStyled from "../../components/common/inputs/text-field-styled";
import SimpleSelectField from "../../components/common/inputs/simple-select-field";
import DatePickerStyled from "../../components/common/inputs/date-picker";
import TimePickerStyled from "../../components/common/inputs/time-picker";
import SimpleSwitch from "../../components/common/inputs/simple-switch";
import AutocompleteStyled from "../../components/common/inputs/autocomplete-styled";
// styled
import { FieldsContainer, Form } from "../../components/common/forms/styled";
// utils
import getDateToday from "../../utils/date/get-date-today";

const ManagerTaskForm = ({
  data,
  objects,
  users,
  register,
  errors,
  watch,
  setValue,
  isObjectPage = false,
  isTasksLoading = false,
  isAuthorEntity = false,
  isEditMode = false,
  isCurator = false
}) => {
  const watchObjectId = watch("objectId", "");
  const watchManagerId = watch("managerId", "");
  const watchIsDone = watch("isDone", false);

  return (
    <Form noValidate>
      <FieldsContainer>
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата *"
          value={data?.date}
          onChange={(value) => setValue("date", value)}
          errors={errors?.date}
          minDate={getDateToday()}
          disabled={isEditMode && !isAuthorEntity}
        />
        <TimePickerStyled
          register={register}
          name="time"
          label="Время *"
          value={data.time}
          setValue={setValue}
          errors={errors?.time}
          disabled={isEditMode && !isAuthorEntity}
        />
      </FieldsContainer>
      {isCurator && (
        <SimpleSelectField
          register={register}
          name="managerId"
          labelId="managerId"
          label="Менеджер"
          itemsList={users}
          value={watchManagerId}
          disabled={isObjectPage}
        />
      )}
      <AutocompleteStyled
        label={
          watchObjectId && !isCurator ? "Объект задачи" : "Задача без объекта"
        }
        register={register}
        name="objectId"
        options={objects}
        value={watchObjectId}
        setValue={setValue}
        watchItemId={watchObjectId}
        disabled={isObjectPage || !watchManagerId || !isCurator}
      />
      <TextFieldStyled
        register={register}
        label="Комментарий"
        name="comment"
        value={data?.comment}
        rows="3"
        multiline={true}
        errors={errors?.comment}
        inputProps={{ maxLength: 150 }}
        disabled={isEditMode && !isAuthorEntity}
      />
      {isEditMode ? (
        <TextFieldStyled
          register={register}
          label="Результат"
          name="result"
          value={data?.result}
          rows="2"
          multiline={true}
          inputProps={{ maxLength: 150 }}
        />
      ) : null}
      {isEditMode ? (
        <SimpleSwitch
          title="Задача выполненна"
          value={watchIsDone}
          isLoading={isTasksLoading}
          onChange={(e) => {
            setValue("isDone", e.target.checked);
          }}
        />
      ) : null}
    </Form>
  );
};

export default ManagerTaskForm;
