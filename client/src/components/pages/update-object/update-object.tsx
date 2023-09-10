// libraries
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import ObjectForm from "../../common/forms/object-form/object-form";
// store
import { getUpdateObjectId } from "../../../store/object/update-object.store";
import {
  getObjectById,
  updateObject,
} from "../../../store/object/objects.store";
// schema
import { objectSchema } from "../../../schemas/object-schema";
import { replaceNullsWithEmptyString } from "../../../utils/data/replace-nulls-with-empty-string";

const UpdateObject = ({ onClose }) => {
  const dispatch = useDispatch();
  const objectId = useSelector(getUpdateObjectId());
  const object = useSelector(getObjectById(objectId));
  const newObject = cloneDeep(object);
  const objectWithoutNull = replaceNullsWithEmptyString(newObject);

  const isEditMode = objectId ? true : false;
  const isObjectHasAddress =
    object?.location?.city && object?.location?.address;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: objectWithoutNull,
    mode: "onBlur",
    resolver: yupResolver(objectSchema),
  });
  const isValidAndHasAdress = isObjectHasAddress && isValid;
  const data = watch();

  const onSubmit = (data) => {
    dispatch(updateObject(data, objectId))
      .then(onClose())
      .then(toast.success("Объект успешно изменен!"));
  };

  return object ? (
    <Box>
      <Header object={object} onClose={onClose} />
      <ObjectForm
        register={register}
        data={objectWithoutNull}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onClose={onClose}
        watch={watch}
        errors={errors}
        isEditMode={isEditMode}
        isValid={isValidAndHasAdress}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateObject;
