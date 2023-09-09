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
  getRidgeObjectsLoadingStatus,
  removeRidgeObject,
  updateRidgeObject,
} from "../../../store/ridge-object/ridge-objects.store";
import ItemOnMap from "../../common/map/item-on-map/item-on-map";
import RidgeObjectBaloon from "../../UI/maps/ridge-object-baloon";

const UpdateRidgeObject = ({ onClose }) => {
  const dispatch = useDispatch();
  const objectId = useSelector(getUpdateRidgeObjectId());
  const object = useSelector(getRidgeObjectById(objectId));
  const isLoading = useSelector(getRidgeObjectsLoadingStatus())
  const isEditMode = objectId ? true : false;

  const address = `${object?.location?.city}, ${object?.location?.address}`;
  const latitude = object?.location?.latitude || null;
  const longitude = object?.location?.longitude || null;
  const mapZoom = object?.location?.zoom || null;
  const center = [latitude, longitude];

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
      <ItemOnMap
        mapZoom={mapZoom}
        hintContent={address}
        center={center}
        baloon={<RidgeObjectBaloon object={object} />}
        isLoading={isLoading}
      />
      <RidgeObjectForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        objectId={objectId}
        watch={watch}
        errors={errors}
        onClose={onClose}
        onRemove={handleRemoveTask}
        removeId={objectId}
        isValid={isValid}
        isEditMode={isEditMode}
        isRidgeObject={true}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateRidgeObject;
