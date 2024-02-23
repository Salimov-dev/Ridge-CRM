import { useSelector } from "react-redux";
import { orderBy } from "lodash";
// MUI
import { InputAdornment } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
// styled
import { FieldsContainer, Form } from "@components/common/forms/styled";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
import FieldsPhone from "./components/fields-phone";
import FieldsEmail from "./components/fields-email";
import FieldsCompany from "./components/field-company";
import FieldsObject from "./components/field-object";
// store
import { getWorkingPositionsList } from "@store/user-params/working-position.store";

const ContactForm = ({
  data,
  setState,
  watch,
  control,
  register,
  errors,
  setValue
}) => {
  const workingPositions = useSelector(getWorkingPositionsList());
  const sortedWorkingPositions = orderBy(workingPositions, ["name"], ["asc"]);
  const watchWorkingPosition = watch("position");

  return (
    <>
      <Form noValidate>
        <FieldsContainer sx={{ flexDirection: "column" }}>
          <TextFieldStyled
            register={register}
            label="Имя"
            name="name"
            errors={errors.name}
            value={data?.name ?? ""}
            onInputQuantities={50}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              )
            }}
          />
          <SelectFieldStyled
            label="Позиция"
            register={register}
            name="position"
            labelId="position"
            itemsList={sortedWorkingPositions}
            value={watchWorkingPosition ?? ""}
          />
          <TextFieldStyled
            register={register}
            label="Комментарий"
            name="comment"
            errors={errors.comment}
            value={data?.comment ?? ""}
            onInputQuantities={50}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <BorderColorOutlinedIcon />
                </InputAdornment>
              )
            }}
          />

          <FieldsCompany
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            watch={watch}
            setState={setState}
          />
          <FieldsPhone
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
          />
          <FieldsEmail
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
          />
          <FieldsObject
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            watch={watch}
            setState={setState}
          />
        </FieldsContainer>
      </Form>
    </>
  );
};

export default ContactForm;
