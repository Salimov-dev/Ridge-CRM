// libraries
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import cloneDeep from "lodash.clonedeep";
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
// other
import { objectSchema } from "../../../schemas/schemas";

const UpdateObject = ({ onClose }) => {
  const objectId = useSelector(getUpdateObjectId());
  const object = useSelector(getObjectById(objectId));
  const isEditMode = objectId ? true : false;
  const isObjectHasAddress =
    object?.location?.city && object?.location?.address;

  const dispatch = useDispatch();

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
      .then(onClose())
      .then(toast.success("Объект успешно изменен!"));
  };

  const newObject = cloneDeep(object)
  function replaceNullWithEmptyString(obj) {
    if (obj.commercialTerms.agentComission === null) {
      obj.commercialTerms.agentComission = '';
    }
    if (obj.commercialTerms.indexingAnnual === null) {
      obj.commercialTerms.indexingAnnual = '';
    }
    if (obj.commercialTerms.rentPrice === null) {
      obj.commercialTerms.rentPrice = '';
    }
    if (obj.commercialTerms.rentSquare === null) {
      obj.commercialTerms.rentSquare = '';
    }
    if (obj.commercialTerms.totalSquare === null) {
      obj.commercialTerms.totalSquare = '';
    }
    return obj;
  }
  console.log("replace", replaceNullWithEmptyString(newObject));
  

  return object ? (
    <Box>
      <Header object={object} onClose={onClose} />
      <ObjectForm
        register={register}
        data={object}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onClose={onClose}
        watch={watch}
        errors={errors}
        isEditMode={isEditMode}
        isValid={isValid}
        isObjectHasAddress={isObjectHasAddress}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateObject;
