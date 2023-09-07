// libraries
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import RidgeObjectForm from "../../common/forms/ridge-object-form/ridge-object-form";
// schemas

import { ridgeObjectSchema } from "../../../schemas/ridge-object-schema";
// store
import { getUpdateRidgeObjectId } from "../../../store/ridge-object/update-ridge-object.store";
import {
  getRidgeObjectById,
  removeRidgeObject,
  updateRidgeObject,
} from "../../../store/ridge-object/ridge-objects.store";

const UpdateRidgeObject = ({ onClose }) => {
  const objectId = useSelector(getUpdateRidgeObjectId());
  const object = useSelector(getRidgeObjectById(objectId));
  const isEditMode = objectId ? true : false;

  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: object,
    mode: "onBlur",
    resolver: yupResolver(ridgeObjectSchema),
  });

  const onSubmit = (data) => {
    dispatch(updateRidgeObject(data, objectId))
      .then(onClose())
      .then(toast.success("Объект успешно изменен!"));
  };

  const handleRemoveTask = (objectId) => {
    dispatch(removeRidgeObject(objectId))
      .then(onClose())
      .then(toast.success("Объект успешно удален с грядки!"));
  };

  return object ? (
    <Box>
      <Header object={object} onClose={onClose} />
      <RidgeObjectForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        isValid={isValid}
        watch={watch}
        errors={errors}
        onClose={onClose}
        isEditMode={isEditMode}
        onRemove={handleRemoveTask}
        removeId={objectId}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateRidgeObject;
