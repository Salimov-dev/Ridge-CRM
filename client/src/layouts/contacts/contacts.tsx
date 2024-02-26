import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
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
// store
import { getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import { getContactsList } from "@store/contact/contact.store";
import { getLastContactsLoadingStatus } from "@store/last-contact/last-contact.store";

const initialState = {
  objectAddress: "",
  curatorComment: "",
  selectedStatuses: [],
  selectedUsers: [],
  startDate: null,
  endDate: null
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
  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const contactsList = useSelector(getContactsList());
  const isLoading = useSelector(getLastContactsLoadingStatus());

  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  // const contactsList = useSelector(getContactsList());

  // const searchedContacts = useSearchContact(contactsList, data);
  // const sortedContacts = useMemo(() => {
  //   return orderBy(searchedContacts, ["created_at"], ["desc"]);
  // }, [searchedContacts]);

  const { handleOpenCreateContactPage, handleOpenContactPage } =
    useDialogHandlers(setState);

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
        itemsColumns={contactsColumns(handleOpenContactPage, isCurator)}
        isLoading={isLoading}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <PageDialogs state={state} setState={setState} />
    </ContainerStyled>
  );
});

export default Contacts;