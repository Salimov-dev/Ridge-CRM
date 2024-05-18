import React, { FC } from "react";
import { useSelector } from "react-redux";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
// components
import SearchField from "@common/inputs/search-field";
import { FieldsContainer, Form } from "@styled/styled-form";
import SearchDatePicker from "@components/common/inputs/search-date-picker";
// store
import { getCompaniesLoadingStatus } from "@store/company/company.store";
// interfaces
import { IDataProps } from "@interfaces/data/data-props.type";

interface CompaniesLayoutFiltersPanelProps {
  data: IDataProps;
  register: UseFormRegister<IDataProps>;
  setValue: UseFormSetValue<IDataProps>;
}

const CompaniesLayoutFiltersPanel: FC<CompaniesLayoutFiltersPanelProps> =
  React.memo(({ data, register, setValue }): JSX.Element => {
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
            onChange={(value: string | string[] | null) =>
              setValue("startDate", value)
            }
            disabled={isLoading}
          />
          <SearchDatePicker
            register={register}
            name="endDate"
            label="Добавлены до"
            value={data.endDate}
            onChange={(value: string | string[] | null) =>
              setValue("endDate", value)
            }
            disabled={isLoading}
          />
        </FieldsContainer>
      </Form>
    );
  });

export default CompaniesLayoutFiltersPanel;
