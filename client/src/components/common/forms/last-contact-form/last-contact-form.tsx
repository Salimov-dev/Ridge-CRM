import { Typography } from "@mui/material";
// components
import TimePickerStyled from "../../inputs/time-picker";
import TextFieldStyled from "../../inputs/text-field-styled";
import DatePickerStyled from "../../inputs/date-picker";
// styled
import { FieldsContainer, Form } from "../styled/styled";

const LastContactForm = ({
  data,
  register,
  errors,
  setValue,
  isUpdate = false,
}) => {
  return (
    <Form>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата последнего контакта"
          value={data?.date}
          minDate={null}
          onChange={(value) => setValue("date", value)}
        />
        <TextFieldStyled
          register={register}
          label="Результат"
          name="result"
          value={data?.result}
          errors={errors?.result}
          rows="2"
          multiline={true}
          onInputQuantities={200}
        />
      </FieldsContainer>
      {!isUpdate ? (
        <>
          <Typography variant="h5">
            Поставить задачу по этому объекту:
          </Typography>
          <FieldsContainer sx={{ flexDirection: "column" }}>
            <FieldsContainer>
              <DatePickerStyled
                register={register}
                name="dateMyTask"
                label="Дата *"
                value={data?.dateMyTask}
                onChange={(value) => setValue("dateMyTask", value)}
              />
              <TimePickerStyled
                register={register}
                label="Время *"
                name="timeMyTaks"
                value={data?.timeMyTaks}
                setValue={setValue}
                errors={errors?.timeMyTaks}
              />
            </FieldsContainer>
            <TextFieldStyled
              register={register}
              label="Комментарий *"
              name="commentMyTask"
              value={data?.commentMyTask}
              rows="3"
              multiline={true}
              errors={errors?.commentMyTask}
              onInputQuantities={200}
            />
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              * чтобы задача успешно создалась, необходимо заполнить все три
              поля (дата, время и комментарий)
            </Typography>
          </FieldsContainer>
        </>
      ) : null}
    </Form>
  );
};

export default LastContactForm;
