import { Box, InputAdornment, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import Title from "../title/title";
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
// MUI
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
// store
import { getMetroList } from "../../../../store/object/metro.store";
import { getDistrictsList } from "../../../../store/object/districts.store";
import { getRidgeObjectsStatusList } from "../../../../store/ridge-object/ridge-object-status.store";
// styled
import { FieldsContainer, Form } from "../styled/styled";
import { getWorkingPositionsList } from "../../../../store/user/working-position.store";

const Component = styled(Box)`
  margin-bottom: 30px;
`;

const RidgeObjectForm = ({
  register,
  data,
  errors,
  handleSubmit,
  onSubmit,
  watch,
}) => {
  const workingPositions = useSelector(getWorkingPositionsList());
  const districts = useSelector(getDistrictsList());
  const objectStatuses = useSelector(getRidgeObjectsStatusList());
  const metros = useSelector(getMetroList());

  const watchName = watch("contact.name", "");
  const watchStatus = watch("status");
  const watchDistrict = watch("location.district");
  const watchMetro = watch("location.metro");
  const watchFindedContacts = watch("findedContacts");
  const watchComment = watch("comment");
  const watchWorkingPosition = watch("contact.position", "");
  const watchCloudLink = watch("cloudLink");

  return (
    <Component>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Title title="Объект" />
        <FieldsContainer>
          <SimpleSelectField
            register={register}
            name="location.district"
            labelId="district"
            label="Район*"
            itemsList={districts}
            value={watchDistrict || ""}
            errors={errors?.location?.district}
          />
          <SimpleSelectField
            register={register}
            name="status"
            labelId="status"
            label="Статус объекта*"
            itemsList={objectStatuses}
            value={watchStatus || ""}
            errors={errors?.status}
          />
          <SimpleSelectField
            register={register}
            name="location.metro"
            labelId="metro"
            label="Метро"
            itemsList={metros}
            value={watchMetro || ""}
            disabled={!watchDistrict && true}
          />
          <TextFieldStyled
            register={register}
            label="Кадастровый номер"
            type="text"
            name="estateOptions.cadastralNumber"
            onInputQuantities={24}
            value={data?.estateOptions?.cadastralNumber}
            InputProps={{
              endAdornment: <InputAdornment position="end">№</InputAdornment>,
            }}
          />
        </FieldsContainer>

        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Контакт"
            name="contact.name"
            errors={errors?.contact?.name}
            value={watchName}
            onInputQuantities={50}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <SimpleSelectField
            register={register}
            name="contact.position"
            labelId="position"
            label="Позиция"
            itemsList={workingPositions}
            value={watchWorkingPosition}
          />
          <TextFieldStyled
            register={register}
            label="Телефон"
            type="number"
            name="contact.phone"
            valueAsNumber={true}
            value={data?.contact?.phone}
            errors={errors?.contact?.phone}
            onInputQuantities={12}
            isHelperText={true}
            helperText="Вводите в формате 79045554433, 78129998877, 9995544"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIphoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextFieldStyled
            register={register}
            label="Email"
            name="contact.email"
            errors={errors?.contact?.email}
            onInputQuantities={100}
            value={data?.contact?.email}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>

        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Найденные контакты"
            name="findedContacts"
            rows="7"
            multiline={true}
            value={watchFindedContacts}
            onInputQuantities={900}
            errors={errors?.findedContacts}
          />
          <TextFieldStyled
            register={register}
            label="Комментарий"
            name="comment"
            rows="7"
            multiline={true}
            value={watchComment}
            onInputQuantities={900}
            errors={errors?.comment}
          />
        </FieldsContainer>
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Ссылка на папку в облако"
            name="cloudLink"
            value={watchCloudLink}
            onInputQuantities={200}
          />
        </FieldsContainer>
      </Form>
    </Component>
  );
};

export default RidgeObjectForm;
