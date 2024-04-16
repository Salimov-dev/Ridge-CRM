import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// components
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
import BasicTable from "@components/common/table/basic-table";
import ContactsLayoutFiltersPanel from "@components/UI/filters-panels/contacts-layout.filters-panel";
import ButtonsContactsLayout from "@components/UI/layout-buttons/buttons.contacts-layout";
// initial-states
import { contactsLayoutInitialState } from "@initial-states/layouts/contacts-layout.initial-state";
// columns
import { contactsColumns } from "@columns/contacts.columns";
// hooks
import useSearchContact from "@hooks/contact/use-search-contact";
// store
import { getIsCurrentUserRoleManager } from "@store/user/users.store";
import { getContactsList } from "@store/contact/contact.store";
import { getLastContactsLoadingStatus } from "@store/last-contact/last-contact.store";

const ContactsLayout = React.memo(() => {
  const [stateDialogPages, setStateDialogPages] = useState({
    createContactPage: false,
    openContactPage: false,
    contactId: null
  });

  const localStorageState = JSON.parse(
    localStorage.getItem("search-contacts-data")
  );

  const formatedState = {
    ...localStorageState,
    startDate: localStorageState?.startDate
      ? dayjs(localStorageState?.startDate)
      : null,
    endDate: localStorageState?.endDate
      ? dayjs(localStorageState?.endDate)
      : null
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: !!localStorageState
      ? formatedState
      : contactsLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();

  const isLoading = useSelector(getLastContactsLoadingStatus());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

  const contactsList = useSelector(getContactsList());
  const { searchedContacts } = useSearchContact(contactsList, data);

  useEffect(() => {
    localStorage.setItem("search-contacts-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-contacts-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-contacts-data",
        JSON.stringify(contactsLayoutInitialState)
      );
    }
  }, []);

  return (
    <ContainerStyled>
      <HeaderLayout title="Контакты" />
      <ButtonsContactsLayout
        data={data}
        setState={setStateDialogPages}
        reset={reset}
      />
      <ContactsLayoutFiltersPanel
        data={data}
        register={register}
        setValue={setValue}
      />
      <BasicTable
        items={searchedContacts}
        itemsColumns={contactsColumns(
          setStateDialogPages,
          isCurrentUserRoleManager
        )}
        isLoading={isLoading}
      />
      <PageDialogs
        state={stateDialogPages}
        setState={setStateDialogPages}
        videoTitle="Как пользоваться страницей с Контактами"
        videoSrc="https://www.youtube.com/embed/nvnfeg8O5pA"
      />
    </ContainerStyled>
  );
});

export default ContactsLayout;
