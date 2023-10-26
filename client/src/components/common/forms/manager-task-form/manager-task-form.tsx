// components
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
import SimpleSwitch from "../../inputs/simple-switch";
// styled
import { FieldsContainer, Form } from "../styled/styled";
// utils
import getDateToday from "../../../../utils/date/get-date-today";
import AutocompleteStyled from "../../inputs/autocomplete-styled";

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
  isEditMode = false,
  isCurator = false,
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
          label="Дата"
          value={data?.date}
          onChange={(value) => setValue("date", value)}
          errors={errors?.date}
          minDate={getDateToday()}
          disabled={isCurator}
        />
        <TimePickerStyled
          register={register}
          name="time"
          label="Время"
          value={data.time}
          setValue={setValue}
          errors={errors?.time}
          disabled={isCurator}
        />
      </FieldsContainer>
      <SimpleSelectField
        register={register}
        name="managerId"
        labelId="managerId"
        label="Менеджер"
        itemsList={users}
        value={watchManagerId}
      />
      <AutocompleteStyled
        label="Объект задачи"
        register={register}
        name="objectId"
        options={objects}
        value={data.objectId}
        setValue={setValue}
        watchItemId={watchObjectId}
        disabled={!watchManagerId}
      />
      {/* <SimpleSelectField
          register={register}
          name="objectId"
          labelId="objectId"
          label="Объект задачи"
          itemsList={objects}
          value={watchObjectId}
          disabled={isObjectPage || isCurator}
        /> */}
      <TextFieldStyled
        register={register}
        label="Комментарий"
        name="comment"
        value={data?.comment}
        rows="3"
        multiline={true}
        errors={errors?.comment}
        onInputQuantities={200}
        disabled={isCurator}
      />
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
