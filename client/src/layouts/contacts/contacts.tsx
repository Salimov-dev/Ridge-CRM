import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { Box, styled } from "@mui/material";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// components
// import BasicTable from "@components/common/table/basic-table";
import HeaderLayout from "@components/common/page-headers/header-layout";
// import ContactsFiltersPanel from "@components/UI/filters-panels/Contacts-filters-panel";
import PageDialogs from "@components/common/dialog/page-dialogs";
import Buttons from "./components/buttons";
// // columns
// import { ContactsColumns } from "@columns/Contacts.columns";
// // map images
// import target from "@assets/map/target-Contact.png";
// import targetCluster from "@assets/map/target-Contact-cluster.png";
// // hooks
// import useSearchContact from "@hooks/Contact/use-search-Contact";
// import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId } from "@store/user/users.store";
import { ContainerStyled } from "@components/common/container/container-styled";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import ContactsFiltersPanel from "@components/UI/filters-panels/contacts.filters-panel";
import BasicTable from "@components/common/table/basic-table";
import { contactsColumns } from "@columns/contacts.columns";
import { getContactsList } from "@store/contact/contact.store";
import { getLastContactsLoadingStatus } from "@store/last-contact/last-contact.store";

// import { getContactstatusList } from "@store/Contact/Contact-status.store";
// import {
//   getContactsList,
//   getContactsLoadingStatus
// } from "@store/Contact/Contacts.store";

const initialState = {
  objectAddress: "",
  curatorComment: "",
  selectedStatuses: [],
  selectedUsers: [],
  startDate: null,
  endDate: null
};

const Contacts = React.memo(() => {
  const [state, setState] = useState({
    contactPage: false,
    createContactPage: false,
    updateContactPage: false,
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
    defaultValues: !!localStorageState ? formatedState : initialState,
    mode: "onChange"
  });

  const data = watch();
  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const contactsList = useSelector(getContactsList());
  const isLoading = useSelector(getLastContactsLoadingStatus());
  console.log("contactsList", contactsList);

  // const contactsStatuses = useSelector(getContactstatusList());

  // const isDialogPage = true;
  // const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  // const contactsList = useSelector(getContactsList());

  // const searchedContacts = useSearchContact(contactsList, data);
  // const sortedContacts = useMemo(() => {
  //   return orderBy(searchedContacts, ["created_at"], ["desc"]);
  // }, [searchedContacts]);

  const { handleOpenCreateContactPage } = useDialogHandlers(setState);

  useEffect(() => {
    localStorage.setItem("search-contacts-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-contacts-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-contacts-data",
        JSON.stringify(initialState)
      );
    }
  }, []);

  return (
    <ContainerStyled>
      <HeaderLayout title="Контакты" />
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreateContactPage={handleOpenCreateContactPage}
        isInputEmpty={isInputEmpty}
      />
      <ContactsFiltersPanel
        data={data}
        // contacts={contactsList}
        // statuses={contactsStatuses}
        register={register}
        setValue={setValue}
        // isCurator={isCurator}
        // isLoading={isLoading}
      />
      <BasicTable
        items={contactsList}
        itemsColumns={contactsColumns()}
        isLoading={isLoading}
      />
      <PageDialogs state={state} setState={setState} />
    </ContainerStyled>
  );
});

export default Contacts;
