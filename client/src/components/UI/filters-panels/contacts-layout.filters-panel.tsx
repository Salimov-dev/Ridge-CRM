import { useSelector } from "react-redux";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import React, { FC } from "react";
// components
import SearchField from "@common/inputs/search-field";
import { FieldsContainer, Form } from "@styled/styled-form";
import SearchDatePicker from "@components/common/inputs/search-date-picker";
import MultiSelectField from "@components/common/inputs/multi-select-field";
// utils
import { getActualContactPositionList } from "@utils/actual-items/get-actual-contact-position-list";
// store
import { getLastContactsLoadingStatus } from "@store/last-contact/last-contact.store";
import { getContactsList } from "@store/contact/contact.store";
import { getContactPositionsList } from "@store/contact/contact-positions.store";
// interfaces
import { IDataProps } from "@interfaces/data/data-props.type";

interface ContactsLayoutFiltersPanelProps {
  data: IDataProps;
  register: UseFormRegister<IDataProps>;
  setValue: UseFormSetValue<IDataProps>;
}

const ContactsLayoutFiltersPanel: FC<ContactsLayoutFiltersPanelProps> =
  React.memo(({ data, register, setValue }): JSX.Element => {
    const contactsList = useSelector(getContactsList());
    const isLoading = useSelector(getLastContactsLoadingStatus());

    const contactWorkingPositions = useSelector(getContactPositionsList());
    const actualContactPositions = getActualContactPositionList(
      contactsList,
      contactWorkingPositions
    );

    return (
      <Form>
        <FieldsContainer>
          <SearchField
            register={register}
            label="Найти по имени"
            name="name"
            value={data.name}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
          <SearchField
            register={register}
            label="Найти по телефону"
            name="phone"
            value={data.phone}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
          <SearchField
            register={register}
            label="Найти по почте"
            name="email"
            value={data.email}
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
          <SearchField
            register={register}
            label="Найти по названию Компании"
            name="company"
            value={data.company}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading}
          />
        </FieldsContainer>
        <FieldsContainer>
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
          <MultiSelectField
            name="users"
            labelId="users-label"
            label="Выбор по позиции"
            itemsList={actualContactPositions}
            selectedItems={data.selectedPositions}
            onChange={(e) => setValue("selectedPositions", e.target.value)}
            disabled={isLoading}
          />
        </FieldsContainer>
      </Form>
    );
  });

export default ContactsLayoutFiltersPanel;
