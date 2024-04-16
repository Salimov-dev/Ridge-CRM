import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
// components
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
import BasicTable from "@components/common/table/basic-table";
import ButtonsCompaniesLayout from "../../components/UI/layout-buttons/buttons.companies-layout";
import CompaniesLayoutFiltersPanel from "@components/UI/filters-panels/companies-layout.filters-panel";
// initial-states
import { companiesLayoutInitialState } from "@initial-states/layouts/companies-layout.initial-state";
// columns
import { companiesColumns } from "@columns/companies.columns";
// hooks
import useSearchCompany from "@hooks/company/use-search-company";
// store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";
import {
  getCompaniesList,
  getCompaniesLoadingStatus
} from "@store/company/company.store";

const CompaniesLayout = React.memo(() => {
  const [stateDialogPages, setStateDialogPages] = useState({
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
    defaultValues: !!localStorageState
      ? formatedState
      : companiesLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();

  const isLoading = useSelector(getCompaniesLoadingStatus());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const companiesList = useSelector(getCompaniesList());
  const { searchedCompanies } = useSearchCompany(companiesList, data);

  useEffect(() => {
    localStorage.setItem("search-Companies-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-companies-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-companies-data",
        JSON.stringify(companiesLayoutInitialState)
      );
    }
  }, []);

  return (
    <ContainerStyled>
      <HeaderLayout title="Компании" />
      <ButtonsCompaniesLayout
        data={data}
        reset={reset}
        setState={setStateDialogPages}
      />
      <CompaniesLayoutFiltersPanel
        data={data}
        register={register}
        setValue={setValue}
      />
      <BasicTable
        items={searchedCompanies}
        itemsColumns={companiesColumns(
          setStateDialogPages,
          isCurrentUserRoleCurator
        )}
        isLoading={isLoading}
      />
      <PageDialogs
        state={stateDialogPages}
        setState={setStateDialogPages}
        videoTitle="Как пользоваться страницей с Компаниями"
        videoSrc="https://www.youtube.com/embed/aIl_VQbtyxs"
      />
    </ContainerStyled>
  );
});

export default CompaniesLayout;
