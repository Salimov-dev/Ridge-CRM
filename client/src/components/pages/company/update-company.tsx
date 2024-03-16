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
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import PageDialogs from "@components/common/dialog/page-dialogs";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import UserEntityAuthor from "@components/common/user/user-entity-author";
// schemas
import { companySchema } from "@schemas/company/company.shema";
// forms
import CompanyForm from "@forms/company/company.form";
// store
import {
  getCompanyById,
  removeCompany,
  updateCompany
} from "@store/company/company.store";
import { getCurrentUserId, getIsUserManager } from "@store/user/users.store";
import { getObjectById } from "@store/object/objects.store";
import { filteredContactsForManager } from "@utils/contacts/filtered-contacts-for-manager";
import { filteredObjectsForManager } from "@utils/objects/filtered-objects-for-manager";

const UpdateCompany = React.memo(({ companyId, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    objectPage: false,
    createPage: false,
    updatePage: false,
    createCompanyPage: false,
    contactId: null
  });

  const company = useSelector(getCompanyById(companyId));

  const currentUserId = useSelector(getCurrentUserId());
  const isManager = useSelector(getIsUserManager(currentUserId));

  const filteredInitialCompany = () => {
    return {
      ...company,
      contacts: filteredContactsForManager(company),
      objects: filteredObjectsForManager(company)
    };
  };

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: company,
    // defaultValues: isManager ? filteredInitialCompany() : company,
    mode: "onChange",
    resolver: yupResolver(companySchema)
  });

  const data = watch();

  // передаем новые добавленные и удаленные объекты
  const newObjects = watch("objects");
  const previousObjects = company?.objects;
  const companyObjects = company?.objects;
  const removedObjects = companyObjects?.filter(
    (obj) => !newObjects.some((item) => item.object === obj.object)
  );
  const addedObjects = newObjects?.filter(
    (newObject) =>
      !companyObjects?.some((obj) => obj.object === newObject.object)
  );

  // передаем новые добавленные и удаленные контакты
  const newContacts = watch("contacts");
  const previousContacts = company?.contacts;
  const companyContacts = company?.contacts;
  const removedContacts = companyContacts?.filter(
    (cont) => !newContacts.some((item) => item.contact === cont.contact)
  );
  const addedContacts = newContacts?.filter(
    (newContact) =>
      !companyContacts?.some((cont) => cont.contact === newContact.contact)
  );

  const onSubmit = () => {
    setIsLoading(true);

    const newData = data;

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
    dispatch<any>(removeCompany(companyId)).then(onClose());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderWithCloseButton
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
        setState={setState}
      />
      <UserEntityAuthor title="Компанию создал" userId={company?.userId} />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        onRemove={handleClickOpen}
        isUpdate={true}
      />
      <LoaderFullWindow
        color={colors.grey[600]}
        size={75}
        isLoading={isLoading}
      />
      <DialogConfirm
        question="Вы уверены, что хотите удалить безвозвратно?"
        open={open}
        onClose={handleClose}
        onSuccessClick={() => handleRemoveContact(companyId)}
      />
      <PageDialogs state={state} setState={setState} />
    </>
  );
});

export default UpdateCompany;
