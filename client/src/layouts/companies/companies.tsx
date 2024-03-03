import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { Box, styled } from "@mui/material";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// components
// import BasicTable from "@components/common/table/basic-table";
import HeaderLayout from "@components/common/page-headers/header-layout";
// import CompaniesFiltersPanel from "@components/UI/filters-panels/Companies-filters-panel";
import PageDialogs from "@components/common/dialog/page-dialogs";
import Buttons from "./components/buttons";
// // columns
// import { CompaniesColumns } from "@columns/Companies.columns";
// // map images
// import target from "@assets/map/target-Contact.png";
// import targetCluster from "@assets/map/target-Contact-cluster.png";
// // hooks
// import useSearchContact from "@hooks/Contact/use-search-Contact";
// import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import { ContainerStyled } from "@components/common/container/container-styled";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// import CompaniesFiltersPanel from "@components/UI/filters-panels/Companies.filters-panel";
import BasicTable from "@components/common/table/basic-table";
// import { CompaniesColumns } from "@columns/Companies.columns";
// import { getLastCompaniesLoadingStatus } from "@store/last-contact/last-contact.store";
import ExportToExelButton from "@components/common/buttons/export-to-excel.button";
import CompaniesFiltersPanel from "@components/UI/filters-panels/companies.filters-panel";
import {
  getCompaniesList,
  getCompaniesLoadingStatus
} from "@store/company/company.store";
import { companiesColumns } from "@columns/companies.columns";

// import { getCompaniestatusList } from "@store/Contact/Contact-status.store";
// import {
//   getCompaniesList,
//   getCompaniesLoadingStatus
// } from "@store/Contact/Companies.store";

const initialState = {
  objectAddress: "",
  curatorComment: "",
  selectedStatuses: [],
  selectedUsers: [],
  startDate: null,
  endDate: null
};

const Companies = React.memo(() => {
  const [rowSelection, setRowSelection] = useState([]);

  const [state, setState] = useState({
    contactPage: false,
    createContactPage: false,
    openContactPage: false,
    companyId: null,
    createCompanyPage: false,
    updateCompanyPage: false
  });

  const localStorageState = JSON.parse(
    localStorage.getItem("search-companies-data")
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

  const { handleOpenCreateCompanyPage, handleOpenUpdateCompanyPage } =
    useDialogHandlers(setState);

  const companiesList = useSelector(getCompaniesList());
  const isLoading = useSelector(getCompaniesLoadingStatus());
  const isHideCheckbox = false;

  // const CompaniesStatuses = useSelector(getCompaniestatusList());

  // const isDialogPage = true;
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  // const CompaniesList = useSelector(getCompaniesList());

  // const searchedCompanies = useSearchContact(CompaniesList, data);
  // const sortedCompanies = useMemo(() => {
  //   return orderBy(searchedCompanies, ["created_at"], ["desc"]);
  // }, [searchedCompanies]);

  // const { handleOpenCreateContactPage, handleOpenContactPage } =
  //   useDialogHandlers(setState);

  useEffect(() => {
    localStorage.setItem("search-Companies-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-companies-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-companies-data",
        JSON.stringify(initialState)
      );
    }
  }, []);

  return (
    <ContainerStyled>
      <HeaderLayout title="Компании" />
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreateCompanyPage={handleOpenCreateCompanyPage}
        isInputEmpty={isInputEmpty}
      />
      {/* <CompaniesFiltersPanel
        data={data}
        // Companies={CompaniesList}
        // statuses={CompaniesStatuses}
        register={register}
        setValue={setValue}
        // isCurator={isCurator}
        // isLoading={isLoading}
      /> */}
      <BasicTable
        items={companiesList}
        itemsColumns={companiesColumns(
          handleOpenUpdateCompanyPage,
          isCurator,
          isHideCheckbox
        )}
        isLoading={isLoading}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <PageDialogs state={state} setState={setState} />
    </ContainerStyled>
  );
});

export default Companies;
