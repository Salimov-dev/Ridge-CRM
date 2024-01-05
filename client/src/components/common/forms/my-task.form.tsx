import { FieldsContainer, Form } from "./styled/styled";
import TextFieldStyled from "../inputs/text-field-styled";
import DatePickerStyled from "../inputs/date-picker";
import TimePickerStyled from "../inputs/time-picker";
import SimpleSwitch from "../inputs/simple-switch";
import AutocompleteStyled from "../inputs/autocomplete-styled";

const MyTaskForm = ({
  data,
  objects,
  register,
  setValue,
  watch,
  errors = null,
  isCurator = false,
  isEditMode = false,
  users = [],
  isObjectPage = false,
}) => {
  const watchObjectId = watch("objectId");
  const watchIsDone = watch("isDone", false);
  const watchIsCallTask = watch("isCallTask");
  const watchManagerId = watch("managerId", "");

  return (
    <Form noValidate>
      <FieldsContainer sx={{ justifyContent: "start" }}>
        <SimpleSwitch
          title="Сделать звонок"
          value={watchIsCallTask}
          padding="0px"
          onChange={(e) => {
            setValue("isCallTask", e.target.checked);
          }}
        />
      </FieldsContainer>
      <FieldsContainer>
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата *"
          value={data?.date || null}
          errors={errors?.date}
          onChange={(value) => setValue("date", value)}
        />
        <TimePickerStyled
          register={register}
          label="Время *"
          name="time"
          required={true}
          value={data?.time}
          setValue={setValue}
          errors={errors?.time}
        />
      </FieldsContainer>
      <AutocompleteStyled
        label="Объект"
        register={register}
        name="objectId"
        options={objects}
        value={data.objectId}
        setValue={setValue}
        watchItemId={watchObjectId}
        disabled={isObjectPage}
        optionLabel={(option) =>
          `${option?.location?.city}, ${option?.location?.address}`
        }
      />
      {isCurator && (
        <AutocompleteStyled
          label="Менеджер"
          register={register}
          name="managerId"
          options={users}
          value={watchManagerId}
          setValue={setValue}
          watchItemId={watchManagerId}
          disabled={!!watchManagerId}
          optionLabel={(option) =>
            `${option?.name?.lastName} ${option?.name?.firstName}`
          }
        />
      )}
      <TextFieldStyled
        register={register}
        label="Комментарий"
        name="comment"
        value={data?.comment}
        rows="3"
        required={true}
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
          padding="0px"
          onChange={(e) => {
            setValue("isDone", e.target.checked);
          }}
        />
      ) : null}
    </Form>
  );
};

export default MyTaskForm;
