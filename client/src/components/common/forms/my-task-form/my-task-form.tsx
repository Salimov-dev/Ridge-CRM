// MUI
import CreateIcon from "@mui/icons-material/Create";
import { InputAdornment } from "@mui/material";
// components
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
import FooterButtons from "../footer-buttons/footer-buttons";
// styled
import { FieldsContainer, Form } from "../styled/styled";
// utils
import getDateToday from "../../../../utils/date/get-date-today";
import SimpleSwitch from "../../inputs/simple-switch";

const MyTaskForm = ({
  data,
  objects,
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
        itemsList={objects}
        name="objectId"
        labelId="objectId"
        label="Объект задачи"
        value={watchObjectId}
        disabled={isObjectPage}
      />
      <TextFieldStyled
        register={register}
        label="Комментарий"
        name="comment"
        value={data?.comment}
        rows="4"
        multiline={true}
        errors={errors?.comment}
        onInputQuantities={200}
      />
      <TextFieldStyled
        register={register}
        label="Результат"
        name="result"
        value={data?.result}
        rows="2"
        multiline={true}
        onInputQuantities={100}
      />

      {isEditMode ? (
        <SimpleSwitch
          title="Задача выполненна"
          checked={data?.isDone}
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

export default MyTaskForm;
