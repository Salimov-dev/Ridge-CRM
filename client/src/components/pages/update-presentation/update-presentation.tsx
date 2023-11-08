// libraries
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import ManagerPresentationForm from "../../common/forms/presentation/manager-presentation-form";
import CuratorPresentationForm from "../../common/forms/presentation/curator-presentation-form";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
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
import transformObjectsForSelect from "../../../utils/objects/transform-objects-for-select";

const UpdatePresentation = ({ onClose }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const transformObjects = transformObjectsForSelect(currentUserObjects)

  const onSubmit = (data) => {
    setIsLoading(true);

    dispatch<any>(updatePresentation(data))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Презентация успешно изменена!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
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

  return isLoading ? (
    <IsLoadingDialog
      text="Немного подождите, изменяем `Задачу себе`"
      isLoading={isLoading}
    />
  ) : (
    <Box>
      <Header onClose={onClose} />
      {isAuthorEntity ? (
        <ManagerPresentationForm
          data={data}
          objects={transformObjects}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          isCurator={isCurator}
        />
      ) : (
        <CuratorPresentationForm
          data={data}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      )}
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
  );
};

export default UpdatePresentation;
