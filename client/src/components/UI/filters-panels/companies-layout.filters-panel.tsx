import React from "react";
import { useSelector } from "react-redux";
// components
import SearchField from "@common/inputs/search-field";
import { FieldsContainer, Form } from "@components/common/forms/styled";
import SearchDatePicker from "@components/common/inputs/search-date-picker";
// store
import { getCompaniesLoadingStatus } from "@store/company/company.store";

const CompaniesLayoutFiltersPanel = React.memo(
  ({ data, register, setValue }) => {
    const isLoading = useSelector(getCompaniesLoadingStatus());

    return (
      <Form>
        <FieldsContainer>
          <SearchField
            register={register}
            label="Найти по названию Компании"
            name="company"
            value={data.company}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
          <SearchField
            register={register}
            label="Найти по адресу объекта"
            name="address"
            value={data.address}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
          <SearchDatePicker
            register={register}
            name="startDate"
            label="Добавлены от"
            value={data.startDate}
            onChange={(value) => setValue("startDate", value)}
            disabled={isLoading}
          />
          <SearchDatePicker
            register={register}
            name="endDate"
            label="Добавлены до"
            value={data.endDate}
            onChange={(value) => setValue("endDate", value)}
            disabled={isLoading}
          />
        </FieldsContainer>
      </Form>
    );
  }
);

export default CompaniesLayoutFiltersPanel;
