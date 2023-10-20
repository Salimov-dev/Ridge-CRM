// libraries
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import AddPresentationForm from "../../common/forms/presentation/add-presentation-form";
// schema
import { presentationSchema } from "../../../schemas/presentation-schema";
// store
import { getObjectsList } from "../../../store/object/objects.store";
import { getCurrentUserId } from "../../../store/user/users.store";
import { getUpdatePresentationId } from "../../../store/presentation/update-presentation.store";
import {
  getPresentationById,
  removePresentation,
  updatePresentation,
} from "../../../store/presentation/presentations.store";

const UpdatePresentation = ({ onClose }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const presentationId = useSelector(getUpdatePresentationId());
  const presentation = useSelector(getPresentationById(presentationId));

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: presentation,
    mode: "onBlur",
    resolver: yupResolver(presentationSchema),
  });

  const data = watch();
  const isFullValid = isValid;
  const isEditMode = presentationId ? true : false;

  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const onSubmit = (data) => {
    dispatch<any>(updatePresentation(data)).then(onClose());
  };

  const handleRemovePresentation = (presentationId) => {
    dispatch<any>(removePresentation(presentationId)).then(onClose());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return presentation ? (
    <Box>
      <Header onClose={onClose} />
      <AddPresentationForm
        data={data}
        objects={transformObjects}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />
      <FooterButtons
        onClose={onClose}
        onUpdate={handleSubmit(onSubmit)}
        onRemove={handleClickOpen}
        isValid={isFullValid}
        isEditMode={isEditMode}
      />
      <ConfirmRemoveDialog
        removeId={presentationId}
        open={open}
        onClose={handleClose}
        onRemove={handleRemovePresentation}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdatePresentation;
