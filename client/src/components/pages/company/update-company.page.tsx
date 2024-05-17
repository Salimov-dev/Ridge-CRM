// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import UserEntityAuthor from "@components/common/user/user-entity-author";
// schemas
import { companySchema } from "@schemas/company/company.shema";
// forms
import CompanyForm from "@forms/company/company.form";
// hooks
import useUpdateCompany from "@hooks/company/use-update-company";
import useRemoveItem from "@hooks/item/use-remove-item";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// initial-states
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// store
import { getContactsList } from "@store/contact/contact.store";
import {
  getCompanyById,
  removeCompany,
  updateCompany
} from "@store/company/company.store";
import {
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";
import DialogPages from "@dialogs/dialog-pages";

interface UpdateCompanyProps {
  state: IDialogPagesState;
  onClose: () => void;
}

const UpdateCompany: FC<UpdateCompanyProps> = React.memo(
  ({ state, onClose }): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);
    const [stateDialogPages, setStateDialogPages] =
      useState<IDialogPagesState>(dialogePagesState);

    const companyId = state.companyId;
    const company = useSelector(getCompanyById(companyId));

    const {
      register,
      watch,
      handleSubmit,
      control,
      formState: { errors },
      setValue
    } = useForm({
      defaultValues: company,
      mode: "onChange",
      resolver: yupResolver(companySchema)
    });

    const data = watch();

    const contactsList = useSelector(getContactsList());
    const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
    const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

    const {
      currentUserContacts,
      currentUserObjects,
      othertUsersContacts,
      othertUsersObjects,
      previousObjects,
      removedObjects,
      addedObjects,
      previousContacts,
      removedContacts,
      addedContacts
    } = useUpdateCompany(data, company, watch);

    const onSubmit = () => {
      setIsLoading(true);

      const newData = {
        ...data,
        contacts: data.contacts.concat(othertUsersContacts),
        objects: data.objects.concat(othertUsersObjects)
      };

      dispatch<any>(
        updateCompany({
          newData,
          previousObjects,
          removedObjects,
          addedObjects,
          previousContacts,
          removedContacts,
          addedContacts
        })
      )
        .then(() => {
          onClose();
          toast.success("Компания успешно изменена!");
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
      onRemove: removeCompany(companyId),
      onClose,
      setIsLoading
    });

    useEffect(() => {
      isCurrentUserRoleManager && setValue("contacts", currentUserContacts);
      isCurrentUserRoleManager && setValue("objects", currentUserObjects);
    }, [contactsList]);

    return (
      <>
        <HeaderWithCloseButtonForPage
          title="Изменить компанию"
          color="black"
          margin="0 0 20px 0"
          onClose={onClose}
        />
        <CompanyForm
          data={data}
          watch={watch}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          setState={setStateDialogPages}
        />
        <UserEntityAuthor title="Компанию создал" userId={company?.userId} />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          onRemove={handleOpenConfirm}
          disabledRemoveButton={isCurrentUserRoleCurator}
        />
        <LoaderFullWindow
          color={colors.grey[600]}
          size={75}
          isLoading={isLoading}
        />
        <DialogConfirm
          question="Вы уверены, что хотите удалить безвозвратно?"
          open={openConfirm}
          onClose={handleCloseConfirm}
          onSuccessClick={handleRemoveItem}
        />
        <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
      </>
    );
  }
);

export default UpdateCompany;
