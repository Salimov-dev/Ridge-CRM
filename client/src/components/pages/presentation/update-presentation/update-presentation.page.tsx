// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import UpdatePresentationPageForms from "./components/update-presentation-page-forms.page";
// schema
import { presentationSchema } from "@schemas/presentation/presentation.schema";
// hooks
import useRemoveItem from "@hooks/use-remove-item";
// store
import {
  getPresentationById,
  removePresentation,
  updatePresentation
} from "@store/presentation/presentations.store";

interface UpdatePresentationProps {
  presentationId: string;
  onClose: () => void;
}

const UpdatePresentation: FC<UpdatePresentationProps> = React.memo(
  ({ presentationId, onClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const presentation = useSelector(getPresentationById(presentationId));

    const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
      setValue
    } = useForm({
      defaultValues: presentation,
      mode: "onBlur",
      resolver: yupResolver(presentationSchema)
    });

    const data = watch();

    const {
      openConfirm,
      handleOpenConfirm,
      handleCloseConfirm,
      handleRemoveItem
    } = useRemoveItem({
      onRemove: removePresentation(presentationId),
      onClose,
      setIsLoading
    });

    const onSubmit = () => {
      setIsLoading(true);

      dispatch(updatePresentation(data))
        .then(() => {
          setIsLoading(false);
          onClose();
          toast.success("Презентация успешно изменена!");
        })
        .catch((error: string) => {
          setIsLoading(false);
          toast.error(error);
        });
    };

    return (
      <>
        <HeaderWithCloseButtonForPage
          title="Редактировать презентацию"
          background={colors.presentation["primary"]}
          color="white"
          onClose={onClose}
        />
        <UpdatePresentationPageForms
          data={data}
          watch={watch}
          errors={errors}
          register={register}
          setValue={setValue}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          onRemove={handleOpenConfirm}
        />
        <DialogConfirm
          question="Вы уверены, что хотите удалить презентацию?"
          open={openConfirm}
          onSuccessClick={() => handleRemoveItem()}
          onClose={handleCloseConfirm}
        />
        <LoaderFullWindow isLoading={isLoading} />
      </>
    );
  }
);

export default UpdatePresentation;
