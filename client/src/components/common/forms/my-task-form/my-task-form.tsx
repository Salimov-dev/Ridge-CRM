// libraries
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import CreateIcon from "@mui/icons-material/Create";
import { Box, styled, InputAdornment } from "@mui/material";
// components
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
import FooterButtons from "../footer-buttons/footer-buttons";
// store
import { createTask } from "../../../../store/task/tasks.store";
// utils
import { capitalizeFirstLetter } from "../../../../utils/data/capitalize-first-letter";
// schema
import { taskSchema } from "../../../../schemas/schemas";

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

const MyTaskForm = ({ date, objects, objectPageId, onClose }) => {
  const dispatch = useDispatch();
  
  const initialState = {
    comment: "",
    date: date,
    time: null,
    objectId: objectPageId,
    managerId: "",
  };

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });
  const data = watch();
  const watchDate = watch("date", null);
  const isFullValid = !watchDate || !isValid;

  const onSubmitMyTask = () => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      managerId: null,
    };
    dispatch(createTask(newData))
      .then(() => onClose())
      .then(() => toast.success("Задача успешно создана!"));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitMyTask)} noValidate>
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
        isValid={isFullValid}
        onClose={onClose}
      />
    </Form>
  );
};

export default MyTaskForm;
