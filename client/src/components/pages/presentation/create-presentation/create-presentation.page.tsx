// libraries
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// schema
import { presentationSchema } from "@schemas/presentation/presentation.schema";
// initial-states
import { presentationCreateInitialState } from "@initial-states/pages/presentation-create.initial-state";
// forms
import PresentationCreateForm from "@forms/presentation/presentation-create.form";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
// store
import { createPresentation } from "@store/presentation/presentations.store";
import { getCurrentUserId } from "@store/user/users.store";
import { getObjectsList } from "@store/object/objects.store";

interface CreatePresentationProps {
  objectId: string;
  onClose: () => void;
  isObjectPage: boolean;
}

const CreatePresentation = React.memo(
  ({
    objectId,
    onClose,
    isObjectPage
  }: CreatePresentationProps): JSX.Element => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch: any = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const currentUserId = useSelector(getCurrentUserId());
    const objects: IObject[] = useSelector(getObjectsList());
    const currentUserObjects = objects?.filter(
      (obj) => obj?.userId === currentUserId
    );

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      formState: { errors }
    } = useForm({
      defaultValues: presentationCreateInitialState,
      mode: "onChange",
      resolver: yupResolver(presentationSchema)
    });

    const data = watch();

    const onSubmit = () => {
      setIsLoading(true);

      dispatch(createPresentation(data))
        .then(() => {
          onClose();
          toast.success("Презентация успешно создана!");
        })
        .catch((error: string) => {
          setIsLoading(false);
          toast.error(error);
        });
    };

    useEffect(() => {
      isObjectPage && setValue<any>("objectId", objectId);
    }, [objectId]);

    return (
      <>
        <HeaderWithCloseButtonForPage
          title="Добавить презентацию"
          color="white"
          margin="0 0 20px 0"
          background={colors.presentation["primary"]}
          onClose={onClose}
        />
        <PresentationCreateForm
          data={data}
          objects={currentUserObjects}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          isObjectPage={isObjectPage}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          disabledRemoveButton={true}
        />
        <LoaderFullWindow isLoading={isLoading} />
      </>
    );
  }
);

export default CreatePresentation;
