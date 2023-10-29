// libraries
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
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
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
import { useState } from "react";
import { toast } from "react-toastify";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";

const UpdateObject = ({ onClose }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const objectId = useSelector(getUpdateObjectId());
  const object = useSelector(getObjectById(objectId));

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: object,
    mode: "onBlur",
  });

  const data = watch();
  const watchDistrict = watch("location.district");
  const watchObjectTypes = watch("estateOptions.objectTypes");
  const watchEstateTypes = watch("estateOptions.estateTypes");
  const watchCurrentRenters = watch("estateOptions.currentRenters");
  const watchStatus = watch("status");
  const watchObjectProperties = watch("estateOptions.objectProperties");

  const isWatchValid =
    Boolean(watchDistrict) &&
    Boolean(watchObjectTypes) &&
    Boolean(watchEstateTypes) &&
    Boolean(watchCurrentRenters) &&
    Boolean(watchStatus) &&
    Boolean(watchObjectProperties);

  const isFullValid = isWatchValid;
  
  const onSubmit = (data) => {
    setIsLoading(true);

    const newData = {
      ...data,
      contact: {
        ...data.contact,
        name: capitalizeFirstLetter(data.contact.name),
      },
      description: {
        ...data.description,
        fullDescription: capitalizeFirstLetter(
          data.description.fullDescription
        ),
      },
      estateOptions: {
        ...data.estateOptions,
        loadingArea: capitalizeFirstLetter(data.estateOptions.loadingArea),
        premisesFloor: capitalizeFirstLetter(data.estateOptions.premisesFloor),
      },
      location: {
        ...data.location,
        city: capitalizeFirstLetter(data.location.city),
        address: capitalizeFirstLetter(data.location.address),
      },
    };
    dispatch<any>(updateObject(newData)).then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Объект успешно изменен!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.success(error);
      });
  };

  return isLoading ? (
    <IsLoadingDialog
      text="Немного подождите, изменяем `Объект`"
      isLoading={isLoading}
    />
  ) : (
    <Box>
      <Header object={object} onClose={onClose} />
      <ObjectForm
        data={data}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onClose={onClose}
        watch={watch}
        setValue={setValue}
        isValid={isFullValid}
      />
    </Box>
  );
};

export default UpdateObject;
