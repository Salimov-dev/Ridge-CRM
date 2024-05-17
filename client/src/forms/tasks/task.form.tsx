import { FC } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { useSelector } from "react-redux";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import DatePickerStyled from "@components/common/inputs/date-picker";
import TimePickerStyled from "@components/common/inputs/time-picker";
import SimpleSwitch from "@components/common/inputs/simple-switch";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// interfaces
import { ITaskCreateInitState } from "@interfaces/task/task.interface";
// store
import { getCurrentUserId } from "@store/user/users.store";
import { getObjectsList } from "@store/object/objects.store";

interface TaskFormProps {
  data: ITaskCreateInitState;
  register: UseFormRegister<ITaskCreateInitState>;
  errors: FieldErrors<ITaskCreateInitState>;
  watch: UseFormWatch<ITaskCreateInitState>;
  setValue: UseFormSetValue<ITaskCreateInitState>;
  isUpdatePage?: boolean;
  isObjectPage?: boolean;
}

const TaskForm: FC<TaskFormProps> = ({
  data,
  register,
  setValue,
  watch,
  errors = null,
  isUpdatePage = false,
  isObjectPage = false
}) => {
  const currentUserId = useSelector(getCurrentUserId());
  const objectsList = useSelector(getObjectsList());
  const currentUserObjects = objectsList?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const watchObjectId = watch("objectId");
  const watchIsDone = watch("isDone");
  const watchIsCallTask = watch("isCallTask");

  return (
    <Form noValidate>
      <FieldsContainer sx={{ justifyContent: "start" }}>
        <SimpleSwitch
          title="Сделать звонок"
          value={watchIsCallTask}
          padding="0px"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setValue("isCallTask", target.checked);
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
          onChange={(value: string | Date | null) => setValue("date", value)}
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
        options={currentUserObjects}
        value={data.objectId}
        setValue={setValue}
        watchItemId={watchObjectId || ""}
        disabled={isObjectPage}
        errors={errors?.objectId}
        optionLabel={(option: { city: any; address: any }) =>
          `${option?.city}, ${option?.address}`
        }
      />
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
      {isUpdatePage ? (
        <TextFieldStyled
          register={register}
          label="Результат"
          name="result"
          value={capitalizeFirstLetter(data?.result) || ""}
          rows="2"
          multiline={true}
          inputProps={{ maxLength: 100 }}
        />
      ) : null}

      {isUpdatePage ? (
        <SimpleSwitch
          title={watchIsCallTask ? "Звонок выполнен" : "Задача выполнена"}
          value={watchIsDone}
          padding="0px"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setValue("isDone", target.checked);
          }}
        />
      ) : null}
    </Form>
  );
};

export default TaskForm;
