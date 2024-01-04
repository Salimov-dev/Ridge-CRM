// libraries
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import Header from "./components/header";
import ManagerPresentationForm from "@components/common/forms/presentation-manager.form";
import CuratorPresentationForm from "@components/common/forms/presentation-curator.form";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import SuccessCancelFormButtons from "@components/common/forms/success-cancel-form-buttons/success-cancel-form-buttons";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
// schema
import { presentationSchema } from "@schemas/presentation-schema";
// utils
import transformObjectsForSelect from "@utils/objects/transform-objects-for-select";
// store
import { getUpdatePresentationId } from "@store/presentation/update-presentation.store";
import { getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getIsUserCurator,
} from "@store/user/users.store";
import {
  getPresentationById,
  removePresentation,
  updatePresentation,
} from "@store/presentation/presentations.store";

const UpdatePresentation = React.memo(({ onClose }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const presentationId = useSelector(getUpdatePresentationId());
  const presentation = useSelector(getPresentationById(presentationId));

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: presentation,
    mode: "onBlur",
    resolver: yupResolver(presentationSchema),
  });

  const data = watch();

  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, presentation)
  );

  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const transformObjects = transformObjectsForSelect(currentUserObjects);

  const onSubmit = (data) => {
    setIsLoading(true);

    const newData = {
      ...data,
    };

    dispatch<any>(updatePresentation(newData))
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
    setIsLoading(true);
    dispatch<any>(removePresentation(presentationId))
      .then(onClose())
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        onRemove={handleClickOpen}
        isUpdate={true}
      />
      <DialogConfirm
        question="Вы уверены, что хотите удалить презентацию?"
        open={open}
        onSuccessClick={() => handleRemovePresentation(presentationId)}
        onClose={handleClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
});

export default UpdatePresentation;
