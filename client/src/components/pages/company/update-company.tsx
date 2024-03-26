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
import { getContactsList } from "@store/contact/contact.store";
import { getObjectsList } from "@store/object/objects.store";

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
  const contactsList = useSelector(getContactsList());
  const objectsList = useSelector(getObjectsList());

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

  // передаем новые добавленные и удаленные объекты
  const newObjects = watch("objects");
  const previousObjects = company?.objects;
  const companyObjects = company?.objects;
  const removedObjects = !isManager
    ? companyObjects?.filter(
        (cont) => !newObjects.some((item) => item.object === cont.object)
      )
    : [];
  const addedObjects = newObjects?.filter(
    (newObject) =>
      !companyObjects?.some((obj) => obj.object === newObject.object)
  );

  // передаем новые добавленные и удаленные контакты
  const newContacts = watch("contacts");
  const previousContacts = company?.contacts;
  const companyContacts = company?.contacts;
  const removedContacts = !isManager
    ? companyContacts?.filter(
        (cont) => !newContacts.some((item) => item.contact === cont.contact)
      )
    : [];
  const addedContacts = newContacts?.filter(
    (newContact) =>
      !companyContacts?.some((cont) => cont.contact === newContact.contact)
  );

  // находим контакты, созданные другими пользователями
  const othertUsersContacts = company?.contacts?.filter((cont) => {
    const contact = contactsList?.find((elem) => elem._id === cont.contact);

    if (contact === undefined) {
      return cont;
    } else {
      return null;
    }
  });

  // находим объекты, созданные другими пользователями
  const othertUsersObjects = company?.objects?.filter((obj) => {
    const object = objectsList?.find((elem) => elem._id === obj.object);

    if (object === undefined) {
      return obj;
    } else {
      return null;
    }
  });

  // фильтруем контакты только текущего менеджера, исключаем контакты других пользователей
  const currentUserContacts = data.contacts?.filter((cont) => {
    const findedContact = contactsList.find(
      (elem) => elem._id === cont.contact
    );

    if (findedContact?.userId === currentUserId) {
      return true;
    }
    return false;
  });

  // фильтруем объекты только текущего менеджера, исключаем объекты других пользователей
  const currentUserObjects = data.objects?.filter((cont) => {
    const findedObject = objectsList.find((elem) => elem._id === cont.object);

    if (findedObject?.userId === currentUserId) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    isManager && setValue("contacts", currentUserContacts);
    isManager && setValue("objects", currentUserObjects);
  }, [contactsList]);

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
