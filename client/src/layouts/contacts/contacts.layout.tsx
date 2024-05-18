import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// components
import HeaderForLayout from "@components/common/headers/header-for-layout";
import { ContainerStyled } from "@components/common/container/container-styled";
import BasicTable from "@components/common/table/basic-table";
import ContactsLayoutFiltersPanel from "@components/UI/filters-panels/contacts-layout.filters-panel";
import ButtonsContactsLayout from "@components/UI/layout-buttons/buttons.contacts-layout";
// initial-states
import { contactsLayoutInitialState } from "@initial-states/layouts/contacts-layout.initial-state";
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// columns
import { contactsColumns } from "@columns/contacts.columns";
// hooks
import useSearchContact from "@hooks/contact/use-search-contact";
// store
import { getIsCurrentUserRoleManager } from "@store/user/users.store";
import { getContactsList } from "@store/contact/contact.store";
import { getLastContactsLoadingStatus } from "@store/last-contact/last-contact.store";
// dialogs
import DialogPages from "@dialogs/dialog-pages";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// utils
import getLocalStorageFiltersState from "@utils/local-storage/get-local-storage-filters-state";
import setLocalStorageFiltersState from "@utils/local-storage/set-local-storage-filters-state";

const ContactsLayout = React.memo(() => {
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const { localStorageData, formatedState } = getLocalStorageFiltersState({
    title: "search-contacts-data"
  });

  const { register, watch, setValue, reset } = useForm({
    defaultValues: localStorageData
      ? formatedState
      : contactsLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();

  const isLoading = useSelector(getLastContactsLoadingStatus());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

  const contactsList = useSelector(getContactsList());
  const { searchedContacts } = useSearchContact(contactsList, data);

  setLocalStorageFiltersState({
    title: "search-contacts-data",
    data: data
  });

  return (
    <ContainerStyled>
      <HeaderForLayout title="Контакты" />
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
        itemsColumns={contactsColumns({
          setState: setStateDialogPages,
          isCurrentUserRoleManager: isCurrentUserRoleManager
        })}
        isLoading={isLoading}
      />
      <DialogPages
        state={stateDialogPages}
        setState={setStateDialogPages}
        videoTitle="Как пользоваться страницей с Контактами"
        videoSrc="https://www.youtube.com/embed/nvnfeg8O5pA"
      />
    </ContainerStyled>
  );
});

export default ContactsLayout;
