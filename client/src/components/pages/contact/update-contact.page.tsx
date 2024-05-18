// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import DialogPages from "@dialogs/dialog-pages";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import UserEntityAuthor from "@components/common/user/user-entity-author";
// forms
import ContactForm from "@forms/contact/contact.form";
// schema
import { contactSchema } from "@schemas/contact/contact.schema";
// hooks
import useUpdateContact from "@hooks/contact/use-update-contact";
import useRemoveItem from "@hooks/item/use-remove-item";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// initial-states
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// store
import {
  getContactById,
  removeContact,
  updateContact
} from "@store/contact/contact.store";

interface UpdateContactProps {
  onClose: () => void;
  state: IDialogPagesState;
}

const UpdateContact: FC<UpdateContactProps> = React.memo(
  ({ state, onClose }): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);
    const [stateDialogPages, setStateDialogPages] =
      useState<IDialogPagesState>(dialogePagesState);

    const contactId = state?.contactId;
    const contact = useSelector(getContactById(contactId));

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      control,
      formState: { errors }
    } = useForm({
      defaultValues: contact,
      mode: "onChange",
      resolver: yupResolver<any>(contactSchema)
    });

    const data = watch();
    const watchObjects = watch("objects");
    const watchCompanies = watch("companies");
    const isValidRemoveButton =
      !watchCompanies?.length && !watchObjects?.length;

    const {
      previousObjects,
      removedObjects,
      addedObjects,
      previousCompanies,
      removedCompanies,
      addedCompanies
    } = useUpdateContact(contact, watch);

    const onSubmit = () => {
      setIsLoading(true);

      dispatch<any>(
        updateContact({
          ...data,
          previousObjects,
          removedObjects,
          addedObjects,
          previousCompanies,
          removedCompanies,
          addedCompanies
        })
      )
        .then(() => {
          onClose();
          toast.success("Контакт успешно изменен!");
        })
        .catch((error: string) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    const {
      openConfirm,
      handleOpenConfirm,
      handleCloseConfirm,
      handleRemoveItem
    } = useRemoveItem({
      onRemove: removeContact(contactId),
      onClose,
      setIsLoading
    });

    return (
      <>
        <HeaderWithCloseButtonForPage
          title="Править контакт"
          color="white"
          margin="0 0 20px 0"
          background="Navy"
          onClose={onClose}
        />
        <ContactForm
          data={data}
          watch={watch}
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
          setState={setStateDialogPages}
        />
        <UserEntityAuthor title="Контакт создал" userId={contact?.userId} />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          onRemove={handleOpenConfirm}
          isValidRemoveButton={!isValidRemoveButton}
        />
        <DialogConfirm
          question="Вы уверены, что хотите удалить безвозвратно?"
          open={openConfirm}
          onClose={handleCloseConfirm}
          onSuccessClick={handleRemoveItem}
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

export default UpdateContact;
