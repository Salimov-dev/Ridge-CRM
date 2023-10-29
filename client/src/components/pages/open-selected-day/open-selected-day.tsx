// libraries
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import { Box, Typography } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import ManagerPresentationForm from "../../common/forms/presentation/manager-presentation-form";
// schema
import { presentationSchema } from "../../../schemas/presentation-schema";
// store
import { getObjectsList } from "../../../store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getIsUserCurator,
} from "../../../store/user/users.store";
import { getUpdatePresentationId } from "../../../store/presentation/update-presentation.store";
import {
  getPresentationById,
  removePresentation,
  updatePresentation,
} from "../../../store/presentation/presentations.store";
import CuratorPresentationForm from "../../common/forms/presentation/curator-presentation-form";

const OpenSelectedDay = ({ onClose, dateCreate }) => {
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
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, presentation)
  );

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

  return true ? (
    <Box>
      <Header onClose={onClose} dateCreate={dateCreate}/>
      <Typography>Здесь будет компонент</Typography>
      <FooterButtons
        onClose={onClose}
        onUpdate={handleSubmit(onSubmit)}
        onRemove={handleClickOpen}
        isValid={isFullValid}
        isEditMode={isEditMode}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default OpenSelectedDay;
