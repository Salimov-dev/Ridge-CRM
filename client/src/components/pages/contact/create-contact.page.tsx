// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { toast } from "react-toastify";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import ContactForm from "@forms/contact/contact.form";
// schema
import { contactSchema } from "@schemas/contact/contact.schema";
// store
import { createContact } from "@store/contact/contact.store";
// initial-states
import { contactCreateInitialState } from "@initial-states/pages/contact-create.initial-state";
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import DialogPages from "@dialogs/dialog-pages";

interface CreateContactProps {
  onClose: () => void;
}

const CreateContact: FC<CreateContactProps> = React.memo(
  ({ onClose }): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [stateDialogPages, setStateDialogPages] =
      useState<IDialogPagesState>(dialogePagesState);

    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      control,
      formState: { errors }
    } = useForm({
      defaultValues: contactCreateInitialState,
      mode: "onChange",
      resolver: yupResolver<any>(contactSchema)
    });

    const data = watch();

    const onSubmit = () => {
      setIsLoading(true);

      dispatch<any>(createContact(data))
        .then(() => {
          onClose();
          toast.success("Контакт успешно создан!");
        })
        .catch((error: string) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return (
      <>
        <HeaderWithCloseButtonForPage
          title="Создать контакт"
          margin="0 0 20px 0"
          background="Indigo"
          onClose={onClose}
        />
        <ContactForm
          data={data}
          watch={watch}
          setState={setStateDialogPages}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          disabledRemoveButton={true}
        />
        <LoaderFullWindow
          color={colors.grey[600]}
          size={75}
          isLoading={isLoading}
        />
        <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
      </>
    );
  }
);

export default CreateContact;
