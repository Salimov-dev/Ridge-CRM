// components
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
import FooterButtons from "../footer-buttons/footer-buttons";
import SimpleSwitch from "../../inputs/simple-switch";
// styled
import { FieldsContainer, Form } from "../styled/styled";
// utils
import getDateToday from "../../../../utils/date/get-date-today";

const ManagerTaskForm = ({
  data,
  objects,
  users,
  isEditMode = false,
  register,
  handleSubmit,
  onSubmit,
  onClose,
  onRemoveTask,
  removeId,
  errors,
  setValue,
  isValid,
  watch,
  isObjectPage,
  isTasksLoading,
}) => {
  const watchObjectId = watch("objectId", "");
  const watchManagerId = watch("managerId", "");
  const watchIsDone = watch("isDone", false);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldsContainer>
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата"
          value={data?.date}
          onChange={(value) => setValue("date", value)}
          errors={errors?.date}
          minDate={getDateToday()}
        />
        <TimePickerStyled
          register={register}
          name="time"
          label="Время"
          value={data.time}
          setValue={setValue}
          errors={errors?.time}
        />
      </FieldsContainer>

      <SimpleSelectField
        register={register}
        name="objectId"
        labelId="objectId"
        label="Объект задачи"
        itemsList={objects}
        value={watchObjectId}
        disabled={isObjectPage || isEditMode}
      />
      <SimpleSelectField
        register={register}
        name="managerId"
        labelId="managerId"
        label="Менеджер"
        itemsList={users}
        value={watchManagerId}
      />
      <TextFieldStyled
        register={register}
        label="Комментарий"
        name="comment"
        value={data?.comment}
        rows="3"
        multiline={true}
        errors={errors?.comment}
        onInputQuantities={200}
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

      <FooterButtons
        isEditMode={isEditMode}
        isValid={isValid}
        onClose={onClose}
        onRemove={onRemoveTask}
        removeId={removeId}
      />
    </Form>
  );
};

export default ManagerTaskForm;
