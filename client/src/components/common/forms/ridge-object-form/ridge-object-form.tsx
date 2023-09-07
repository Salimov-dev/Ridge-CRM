import { useSelector } from "react-redux";
// components
import Title from "../title/title";
import FooterButtons from "../footer-buttons/footer-buttons";
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
// store
import { getMetroList } from "../../../../store/object/metro.store";
import { getDistrictsList } from "../../../../store/object/districts.store";
import { getRidgeObjectsStatusList } from "../../../../store/ridge-object/ridge-object-status.store";
// styled
import { FieldsContainer, Form } from "../styled/styled";

const RidgeObjectForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  onClose,
  onRemove,
  removeId,
  watch,
  isValid,
  isEditMode = false,
}) => {
  const districts = useSelector(getDistrictsList());
  const objectStatuses = useSelector(getRidgeObjectsStatusList());
  const metros = useSelector(getMetroList());

  const watchStatus = watch("status");
  const watchDistrict = watch("location.district");
  const watchMetro = watch("location.metro");
  const watchFindedContacts = watch("findedContacts");
  const watchComment = watch("comment");

  return (
    <>
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
        </FieldsContainer>

        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Найденные контакты"
            name="findedContacts"
            rows="4"
            multiline={true}
            value={watchFindedContacts}
            onInputQuantities={900}
            errors={errors?.findedContacts}
          />
          <TextFieldStyled
            register={register}
            label="Комментарий"
            name="comment"
            rows="4"
            multiline={true}
            value={watchComment}
            onInputQuantities={900}
            errors={errors?.comment}
          />
        </FieldsContainer>

        <FooterButtons
          isEditMode={isEditMode}
          isValid={!isValid}
          onClose={onClose}
          onRemove={onRemove}
          removeId={removeId}
        />
      </Form>
    </>
  );
};

export default RidgeObjectForm;
