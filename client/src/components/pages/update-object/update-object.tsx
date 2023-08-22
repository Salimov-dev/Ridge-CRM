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
import ObjectForm from "../../common/forms/object-form";
// store
import { getObjectById, updateObject } from "../../../store/objects.store";
// other
import { objectSchema } from "../../../schemas/schemas";

const UpdateObject = () => {
  const { objectId } = useParams();
  const object = useSelector(getObjectById(objectId));
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isEditMode = objectId ? true : false;
  const isObjectHasAddress = object?.location?.city && object?.location?.address;

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

  const watchName = watch("contact.name", "");
  const watchStatus = watch("status", "");
  const watchDistrict = watch("location.district", "");
  const watchMetro = watch("location.metro", "");
  const watchCurrentRenters = watch("estateOptions.currentRenters", "");
  const watchobjectConditions = watch("estateOptions.objectConditions", "");
  const watchRentTypes = watch("commercialTerms.rentTypes", "");
  const watchObjectTypes = watch("estateOptions.objectTypes", "");
  const watchEstateTypes = watch("estateOptions.estateTypes", "");
  const watchWorkingPosition = watch("contact.position", "");

  const onSubmit = (data) => {
    dispatch(updateObject(data, objectId))
      .then(navigate(-1))
      .then(toast.success("Объект успешно изменен!"));
  };

  return (
    <Box>
      <Header object={object} />
      <ObjectForm
        data={object}
        objectId={objectId}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isEditMode={isEditMode}
        isValid={isValid}
        isObjectHasAddress={isObjectHasAddress}
        watchName={watchName}
        watchDistrict={watchDistrict}
        watchMetro={watchMetro}
        watchCurrentRenters={watchCurrentRenters}
        watchobjectConditions={watchobjectConditions}
        watchRentTypes={watchRentTypes}
        watchObjectTypes={watchObjectTypes}
        watchEstateTypes={watchEstateTypes}
        watchStatus={watchStatus}
        watchWorkingPosition={watchWorkingPosition}
      />
    </Box>
  );
};

export default UpdateObject;
