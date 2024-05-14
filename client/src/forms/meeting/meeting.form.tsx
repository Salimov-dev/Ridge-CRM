import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { useSelector } from "react-redux";
import { FC } from "react";
import { InputAdornment } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// components
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
import TimePickerStyled from "@components/common/inputs/time-picker";
import DatePickerStyled from "@components/common/inputs/date-picker";
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import SimpleSwitch from "@components/common/inputs/simple-switch";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// interfaces
import { IMeetingCreateInitState } from "@interfaces/meeting/meeting.interface";
import { IObject } from "@interfaces/object/object.interface";
// store
import { getMeetingTypesList } from "@store/meeting/meeting-types.store";
import { getMeetingStatusesList } from "@store/meeting/meeting-status.store";
import { getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId } from "@store/user/users.store";

interface MeetingCreateFormProps {
  data: IMeetingCreateInitState;
  register: UseFormRegister<IMeetingCreateInitState>;
  errors: FieldErrors<IMeetingCreateInitState>;
  watch: UseFormWatch<IMeetingCreateInitState>;
  setValue: UseFormSetValue<IMeetingCreateInitState>;
  isUpdatePage?: boolean;
  isObjectPage?: boolean;
}

const MeetingForm: FC<MeetingCreateFormProps> = ({
  data,
  register,
  errors,
  watch,
  setValue,
  isUpdatePage = false,
  isObjectPage = false
}) => {
  const currentUserId = useSelector(getCurrentUserId());

  const objects = useSelector(getObjectsList());
  const currentUserObjects = objects?.filter(
    (obj: IObject) => obj?.userId === currentUserId
  );

  const types = useSelector(getMeetingTypesList());
  const statuses = useSelector(getMeetingStatusesList());

  const watchStatus = watch("status");
  const watchObjectId = watch("objectId");
  const watchTypeMeeting = watch("type");
  const watchIsDone = watch("isDone");

  return (
    <Form noValidate>
      <FieldsContainer>
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата встречи *"
          value={data?.date || null}
          onChange={(value: string | Date | null) => setValue("date", value)}
          errors={errors?.date}
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
          options={currentUserObjects}
          value={data.objectId}
          setValue={setValue}
          watchItemId={watchObjectId}
          disabled={isObjectPage}
          optionLabel={(option: { city: any; address: any }) =>
            `${option?.city}, ${option?.address}`
          }
          errors={errors?.objectId}
        />

        <TextFieldStyled
          register={register}
          label="Комментарий"
          name="comment"
          required={true}
          errors={errors?.comment}
          value={capitalizeFirstLetter(data?.comment)}
          inputProps={{ maxLength: 150 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CreateIcon />
              </InputAdornment>
            )
          }}
        />
      </FieldsContainer>
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
          title="Встреча выполненна"
          value={watchIsDone}
          padding="0"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setValue("isDone", target.checked);
          }}
        />
      ) : null}
    </Form>
  );
};

export default MeetingForm;
