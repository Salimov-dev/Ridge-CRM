import { FieldsContainer, Form } from "../../components/common/forms/styled";
import TextFieldStyled from "../../components/common/inputs/text-field-styled";
import DatePickerStyled from "../../components/common/inputs/date-picker";
import TimePickerStyled from "../../components/common/inputs/time-picker";
import SimpleSwitch from "../../components/common/inputs/simple-switch";
import AutocompleteStyled from "../../components/common/inputs/autocomplete-styled";
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";

const MyTaskForm = ({
  data,
  objects,
  register,
  setValue,
  watch,
  errors = null,
  isCurator = false,
  isEditMode = false,
  users,
  isObjectPage = false
}) => {
  const watchObjectId = watch("objectId");
  const watchIsDone = watch("isDone");
  const watchIsCallTask = watch("isCallTask");
  const watchManagerId = watch("managerId");

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
        optionLabel={(option) => `${option?.city}, ${option?.address}`}
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
          disabled={isObjectPage && !!watchManagerId}
          optionLabel={(option) => `${option?.name}`}
        />
      )}
      <TextFieldStyled
        register={register}
        label="Комментарий"
        name="comment"
        value={capitalizeFirstLetter(data?.comment)}
        rows="3"
        required={true}
        multiline={true}
        errors={errors?.comment}
        inputProps={{ maxLength: 200 }}
      />
      {isEditMode ? (
        <TextFieldStyled
          register={register}
          label="Результат"
          name="result"
          value={capitalizeFirstLetter(data?.result)}
          rows="2"
          multiline={true}
          inputProps={{ maxLength: 100 }}
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