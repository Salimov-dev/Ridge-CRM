// MUI
import { Box, styled, InputAdornment } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
// components
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
import FooterButtons from "../footer-buttons";

const Form = styled(`form`)({
  width: "500px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  marginTop: "12px",
  gap: "4px",
});

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: "center";
  gap: 4px;
`;

const TaskForm = ({
  data,
  objects,
  users,
  register,
  onSubmit,
  onClose,
  handleSubmit,
  errors,
  setValue,
  isValid,
  isManagerTask=false
}) => {

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
        />
        <TimePickerStyled
          register={register}
          data={data}
          name="time"
          label="Время"
          setValue={setValue}
          errors={errors?.time}
        />
      </FieldsContainer>

      <SimpleSelectField
        register={register}
        itemsList={objects}
        name="objectId"
        labelId="objectId"
        label="Объект"
      />
      {isManagerTask ? <SimpleSelectField
        register={register}
        itemsList={users}
        name="managerId"
        labelId="managerId"
        label="Менеджер"
      /> : null}
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
        //   isEditMode={isEditMode}
          isValid={isValid}
        onClose={onClose}
      />
    </Form>
  );
};

export default TaskForm;
