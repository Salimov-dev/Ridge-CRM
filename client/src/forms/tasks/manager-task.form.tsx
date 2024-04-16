import { useSelector } from "react-redux";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import SimpleSelectField from "@components/common/inputs/simple-select-field";
import DatePickerStyled from "@components/common/inputs/date-picker";
import TimePickerStyled from "@components/common/inputs/time-picker";
import SimpleSwitch from "@components/common/inputs/simple-switch";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// utils
import getDateToday from "@utils/date/get-date-today";
import { capitalizeAllFirstLetters } from "@utils/data/capitalize-all-first-letters";
// store
import {
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";

const ManagerTaskForm = ({
  data,
  objects,
  users,
  register,
  errors,
  watch,
  setValue,
  isObjectPage = false,
  isEditMode = false
}) => {
  const watchObjectId = watch("objectId", "");
  const watchManagerId = watch("managerId", "");
  const watchIsDone = watch("isDone", false);

  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  return (
    <Form noValidate>
      <FieldsContainer>
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата *"
          value={data?.date || null}
          onChange={(value) => setValue("date", value)}
          errors={errors?.date}
          minDate={getDateToday()}
          disabled={isCurrentUserRoleManager}
        />
        <TimePickerStyled
          register={register}
          name="time"
          label="Время *"
          value={data.time}
          setValue={setValue}
          errors={errors?.time}
          disabled={isCurrentUserRoleManager}
        />
      </FieldsContainer>
      {isCurrentUserRoleCurator && (
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
          watchObjectId && !isCurrentUserRoleCurator
            ? "Объект задачи"
            : "Задача без объекта"
        }
        register={register}
        name="objectId"
        options={objects}
        value={watchObjectId}
        setValue={setValue}
        watchItemId={watchObjectId}
        disabled={!objects.length || isObjectPage || !isCurrentUserRoleCurator}
        optionLabel={(option) => `${option?.city}, ${option?.address}`}
      />
      <TextFieldStyled
        register={register}
        label="Комментарий"
        name="comment"
        value={capitalizeAllFirstLetters(data?.comment)}
        rows="3"
        multiline={true}
        errors={errors?.comment}
        inputProps={{ maxLength: 150 }}
        disabled={isCurrentUserRoleManager}
      />
      {isEditMode ? (
        <TextFieldStyled
          register={register}
          label="Результат"
          name="result"
          value={capitalizeAllFirstLetters(data?.result)}
          rows="2"
          multiline={true}
          inputProps={{ maxLength: 150 }}
          disabled={isCurrentUserRoleCurator}
        />
      ) : null}
      {isEditMode ? (
        <SimpleSwitch
          title="Задача выполнена"
          value={watchIsDone}
          onChange={(e) => {
            setValue("isDone", e.target.checked);
          }}
        />
      ) : null}
    </Form>
  );
};

export default ManagerTaskForm;
