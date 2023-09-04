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

const MyTaskForm = ({
  data,
  objects,
  isEditMode = false,
  register,
  handleSubmit,
  onSubmit,
  onClose,
  errors,
  setValue,
  isValid,
  watch,
  isObjectPage
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
          minDate={null}
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
        rows="3"
        multiline={true}
        errors={errors?.comment}
        onInputQuantities={100}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CreateIcon />
            </InputAdornment>
          ),
        }}
      />

      <FooterButtons
        isEditMode={isEditMode}
        isValid={isValid}
        onClose={onClose}
      />
    </Form>
  );
};

export default MyTaskForm;
