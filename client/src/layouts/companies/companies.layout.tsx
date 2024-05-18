import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// components
import HeaderForLayout from "@components/common/headers/header-for-layout";
import { ContainerStyled } from "@components/common/container/container-styled";
import BasicTable from "@components/common/table/basic-table";
import ButtonsCompaniesLayout from "@components/UI/layout-buttons/buttons.companies-layout";
import CompaniesLayoutFiltersPanel from "@components/UI/filters-panels/companies-layout.filters-panel";
// initial-states
import { companiesLayoutInitialState } from "@initial-states/layouts/companies-layout.initial-state";
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// columns
import { companiesColumns } from "@columns/companies.columns";
// hooks
import useSearchCompany from "@hooks/company/use-search-company";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// dialogs
import DialogPages from "@dialogs/dialog-pages";
// utils
import getLocalStorageFiltersState from "@utils/local-storage/get-local-storage-filters-state";
import setLocalStorageFiltersState from "@utils/local-storage/set-local-storage-filters-state";
// store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";
import {
  getCompaniesList,
  getCompaniesLoadingStatus
} from "@store/company/company.store";

const CompaniesLayout = React.memo(() => {
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const { localStorageData, formatedState } = getLocalStorageFiltersState({
    title: "search-companies-data"
  });

  const { register, watch, setValue, reset } = useForm({
    defaultValues: localStorageData
      ? formatedState
      : companiesLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();

  const isLoading = useSelector(getCompaniesLoadingStatus());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const companiesList = useSelector(getCompaniesList());
  const { searchedCompanies } = useSearchCompany(companiesList, data);

  setLocalStorageFiltersState({
    title: "search-companies-data",
    data: data
  });

  return (
    <ContainerStyled>
      <HeaderForLayout title="Компании" />
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
        itemsColumns={companiesColumns({
          setState: setStateDialogPages,
          isCurrentUserRoleCurator: isCurrentUserRoleCurator
        })}
        isLoading={isLoading}
      />
      <DialogPages
        state={stateDialogPages}
        setState={setStateDialogPages}
        videoTitle="Как пользоваться страницей с Компаниями"
        videoSrc="https://www.youtube.com/embed/aIl_VQbtyxs"
      />
    </ContainerStyled>
  );
});

export default CompaniesLayout;
