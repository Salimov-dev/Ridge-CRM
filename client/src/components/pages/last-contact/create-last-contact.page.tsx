// libraries
import { toast } from "react-toastify";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { useDispatch } from "react-redux";
// components
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// forms
import LastContactForm from "@forms/last-contact/last-contact.form";
// store
import { createLastContact } from "@store/last-contact/last-contact.store";
// schema
import { lastContactSchema } from "@schemas/last-contact/last-contact.schema";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// initial-states
import { lastContactCreateInitialState } from "@initial-states/pages/last-contact-create.initial-state";
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import DialogPages from "@dialogs/dialog-pages";

interface CreateLastContactProps {
  state: IDialogPagesState;
  onClose: () => void;
}

const CreateLastContact: FC<CreateLastContactProps> = React.memo(
  ({ state, onClose }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const objectPageId = state.objectId;

    const [isLoading, setIsLoading] = useState(false);
    const [stateDialogPages, setStateDialogPages] =
      useState<IDialogPagesState>(dialogePagesState);

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      control,
      formState: { errors }
    } = useForm({
      defaultValues: lastContactCreateInitialState,
      mode: "onChange",
      resolver: yupResolver<any>(lastContactSchema)
    });

    const data = watch();

    const onSubmit = () => {
      setIsLoading(true);

      const lastContactData = {
        ...data,
        date: data.date,
        objectId: data.objectId,
        result: capitalizeFirstLetter(data.result).trim()
      };

      dispatch<any>(createLastContact(lastContactData))
        .then(() => {
          onClose();
          toast.success("Последний контакт успешно создан!");
        })
        .catch((error: string) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    useEffect(() => {
      if (objectPageId) {
        setValue<any>("objectId", objectPageId);
      }
    }, [objectPageId]);

    return (
      <>
        <HeaderWithCloseButtonForPage
          title="Добавить последний контакт"
          color="white"
          margin="0 0 20px 0"
          background={colors.lastContact["primary"]}
          onClose={onClose}
        />
        <LastContactForm
          data={data}
          register={register}
          errors={errors}
          setValue={setValue}
          control={control}
          watch={watch}
          setState={setStateDialogPages}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          disabledRemoveButton={true}
        />
        <LoaderFullWindow isLoading={isLoading} />
        <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
      </>
    );
  }
);

export default CreateLastContact;
