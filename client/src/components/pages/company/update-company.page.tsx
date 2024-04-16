// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import PageDialogs from "@components/common/dialog/page-dialogs";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import UserEntityAuthor from "@components/common/user/user-entity-author";
// schemas
import { companySchema } from "@schemas/company/company.shema";
// forms
import CompanyForm from "@forms/company/company.form";
// hooks
import useUpdateCompany from "@hooks/company/use-update-company";
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

const UpdateCompany = React.memo(({ companyId, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stateDialogPages, setStateDialogPages] = useState({
    objectPage: false,
    createPage: false,
    updatePage: false,
    createCompanyPage: false,
    contactId: null
  });

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
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());
  const contactsList = useSelector(getContactsList());

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

  useEffect(() => {
    isCurrentUserRoleManager && setValue("contacts", currentUserContacts);
    isCurrentUserRoleManager && setValue("objects", currentUserObjects);
  }, [contactsList]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

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
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveContact = (companyId) => {
    setIsLoading(true);
    dispatch<any>(removeCompany(companyId))
      .then(onClose(), handleCloseConfirm())
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
        onSuccessClick={() => handleRemoveContact(companyId)}
      />
      <PageDialogs state={stateDialogPages} setState={setStateDialogPages} />
    </>
  );
});

export default UpdateCompany;
