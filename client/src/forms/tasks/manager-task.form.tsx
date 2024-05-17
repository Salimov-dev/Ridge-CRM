import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { FC } from "react";
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
// interfaces
import { IManagerTaskCreateInitState } from "@interfaces/task/task.interface";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager,
  getUsersList
} from "@store/user/users.store";

interface ManagerTaskFormProps {
  data: IManagerTaskCreateInitState;
  register: UseFormRegister<IManagerTaskCreateInitState>;
  setValue: UseFormSetValue<IManagerTaskCreateInitState>;
  watch: UseFormWatch<IManagerTaskCreateInitState>;
  errors: FieldErrors<IManagerTaskCreateInitState>;
  isUpdatePage?: boolean;
  isObjectPage?: boolean;
}

const ManagerTaskForm: FC<ManagerTaskFormProps> = ({
  data,
  register,
  errors,
  watch,
  setValue,
  isObjectPage = false,
  isUpdatePage = false
}): JSX.Element => {
  const watchManagerId = watch("managerId");

  const watchObjectId = watch("objectId", null);
  const watchIsDone = watch("isDone", false);
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const objectsList = useSelector(getObjectsList());
  const selectedManagerObjects = objectsList?.filter(
    (obj) => obj?.userId === watchManagerId
  );

  const users = useSelector(getUsersList());
  const actualUsersArray = users?.map((user) => {
    const lastName = user?.lastName;
    const firstName = user?.firstName;

    return {
      _id: user._id,
      name: `${lastName ? lastName : "Без"} ${firstName ? firstName : "имени"}`
    };
  });

  return (
    <Form noValidate>
      <FieldsContainer>
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата *"
          value={data?.date || null}
          onChange={(value: any) => setValue("date", value)}
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
          itemsList={actualUsersArray}
          value={watchManagerId}
          errors={errors?.managerId}
          disabled={isObjectPage}
        />
      )}
      {watchManagerId ? (
        <AutocompleteStyled
          label={
            watchObjectId && !isCurrentUserRoleCurator
              ? "Объект задачи"
              : "Задача без объекта"
          }
          register={register}
          name="objectId"
          options={selectedManagerObjects}
          value={watchObjectId}
          setValue={setValue}
          watchItemId={watchObjectId}
          errors={errors?.objectId}
          disabled={
            !selectedManagerObjects.length ||
            isObjectPage ||
            !isCurrentUserRoleCurator
          }
          optionLabel={(option: { city: any; address: any }) =>
            `${option?.city}, ${option?.address}`
          }
        />
      ) : null}
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
      {isUpdatePage ? (
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
      {isUpdatePage ? (
        <SimpleSwitch
          title="Задача выполнена"
          value={watchIsDone}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setValue("isDone", target.checked);
          }}
        />
      ) : null}
    </Form>
  );
};

export default ManagerTaskForm;
