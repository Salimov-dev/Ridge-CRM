import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
// components
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import Buttons from "./components/buttons";
import { ContainerStyled } from "@components/common/container/container-styled";
import ContactsFiltersPanel from "@components/UI/filters-panels/contacts.filters-panel";
import BasicTable from "@components/common/table/basic-table";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// columns
import { contactsColumns } from "@columns/contacts.columns";
// hooks
import useSearchContact from "@hooks/contact/use-search-contact";
// store
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import { getContactsList } from "@store/contact/contact.store";
import { getLastContactsLoadingStatus } from "@store/last-contact/last-contact.store";
import { getWorkingPositionsList } from "@store/user-params/working-position.store";

const initialState = {
  name: "",
  address: "",
  phone: "",
  company: "",
  email: "",
  startDate: null,
  endDate: null,
  selectedPositions: [],
  videoPlayerPage: false
};

const Contacts = React.memo(() => {
  const [rowSelection, setRowSelection] = useState([]);

  const [state, setState] = useState({
    contactPage: false,
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
    defaultValues: !!localStorageState ? formatedState : initialState,
    mode: "onChange"
  });

  const data = watch();

  const currentUserId = useSelector(getCurrentUserId());
  const contactsList = useSelector(getContactsList());
  const contactsPositions = useSelector(getWorkingPositionsList());

  const isLoading = useSelector(getLastContactsLoadingStatus());

  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);
  const isHideCheckbox = false;

  const searchedContacts = useSearchContact(contactsList, data);

  const sortedContacts = useMemo(() => {
    return orderBy(searchedContacts, ["created_at"], ["desc"]);
  }, [searchedContacts]);

  const {
    handleOpenCreateContactPage,
    handleOpenContactPage,
    handleOpenVideoPlayerPage,
    handleOpenUpdateCompanyPage,
    handleOpenObjectPage
  } = useDialogHandlers(setState);

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
        onOpenVideoPlayerPage={handleOpenVideoPlayerPage}
        isInputEmpty={isInputEmpty}
      />
      <ContactsFiltersPanel
        data={data}
        contacts={contactsList}
        positions={contactsPositions}
        register={register}
        setValue={setValue}
        isCurator={isCurator}
        isLoading={isLoading}
      />
      <BasicTable
        items={sortedContacts}
        itemsColumns={contactsColumns(
          handleOpenContactPage,
          isHideCheckbox,
          handleOpenUpdateCompanyPage,
          {},
          handleOpenObjectPage
        )}
        isLoading={isLoading}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <PageDialogs
        state={state}
        setState={setState}
        videoTitle="Как пользоваться страницей с Контактами"
        videoSrc="https://www.youtube.com/embed/nvnfeg8O5pA"
      />
    </ContainerStyled>
  );
});

export default Contacts;
