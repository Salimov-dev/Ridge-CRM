// libraries
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import ObjectForm from "../../common/forms/object-form/object-form";
// store
import { getObjectById, updateObject } from "../../../store/object/objects.store";
// other
import { objectSchema } from "../../../schemas/schemas";

const UpdateObject = () => {
  const { objectId } = useParams();
  const object = useSelector(getObjectById(objectId));
  const isEditMode = objectId ? true : false;
  const isObjectHasAddress =
    object?.location?.city && object?.location?.address;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: object,
    mode: "onBlur",
    resolver: yupResolver(objectSchema),
  });

  const onSubmit = (data) => {
    dispatch(updateObject(data, objectId))
      .then(navigate(-1))
      .then(toast.success("Объект успешно изменен!"));
  };

  return (
    <Box>
      <Header object={object} />
      <ObjectForm
        register={register}
        data={object}
        objectId={objectId}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        watch={watch}
        errors={errors}
        isEditMode={isEditMode}
        isValid={isValid}
        isObjectHasAddress={isObjectHasAddress}
      />
    </Box>
  );
};

export default UpdateObject;
