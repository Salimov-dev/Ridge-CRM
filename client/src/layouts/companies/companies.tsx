import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// components
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import Buttons from "./components/buttons";
import { ContainerStyled } from "@components/common/container/container-styled";
import BasicTable from "@components/common/table/basic-table";
import CompaniesFiltersPanel from "@components/UI/filters-panels/companies.filters-panel";
// columns
import { companiesColumns } from "@columns/companies.columns";
// hooks
import useSearchCompany from "@hooks/company/use-search-company";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import {
  getCompaniesList,
  getCompaniesLoadingStatus
} from "@store/company/company.store";

const initialState = {
  company: "",
  address: "",
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
    updateCompanyPage: false,
    videoPlayerPage: false
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
  const currentUserId = useSelector(getCurrentUserId());

  const {
    handleOpenCreateCompanyPage,
    handleOpenUpdateCompanyPage,
    handleOpenVideoPlayerPage,
    handleOpenObjectPage,
    handleOpenContactPage
  } = useDialogHandlers(setState);

  const companiesList = useSelector(getCompaniesList());
  const isLoading = useSelector(getCompaniesLoadingStatus());
  const isHideCheckbox = false;

  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const searchedCompanies = useSearchCompany(companiesList, data);
  const sortedCompanies = useMemo(() => {
    return orderBy(searchedCompanies, ["created_at"], ["desc"]);
  }, [searchedCompanies]);

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
        onOpenVideoPlayerPage={handleOpenVideoPlayerPage}
        isInputEmpty={isInputEmpty}
      />
      <CompaniesFiltersPanel
        data={data}
        register={register}
        setValue={setValue}
        isCurator={isCurator}
        isLoading={isLoading}
      />
      <BasicTable
        items={sortedCompanies}
        itemsColumns={companiesColumns(
          handleOpenUpdateCompanyPage,
          isCurator,
          isHideCheckbox,
          handleOpenObjectPage,
          {},
          handleOpenContactPage
        )}
        isLoading={isLoading}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <PageDialogs
        state={state}
        setState={setState}
        videoTitle="Как пользоваться страницей с Компаниями"
        videoSrc="https://www.youtube.com/embed/aIl_VQbtyxs"
      />
    </ContainerStyled>
  );
});

export default Companies;
