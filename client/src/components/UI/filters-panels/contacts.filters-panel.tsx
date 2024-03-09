import React from "react";
// components
import SearchField from "@common/inputs/search-field";
import { FieldsContainer, Form } from "@components/common/forms/styled";
import SearchDatePicker from "@components/common/inputs/search-date-picker";
import MultiSelectField from "@components/common/inputs/multi-select-field";
// utils
import { getActualContactPositionList } from "@utils/actual-items/get-actual-contact-position-list";

const ContactsFiltersPanel = React.memo(
  ({ data, contacts, positions, register, setValue, isLoading }) => {
    const actualContactPositions = getActualContactPositionList(
      contacts,
      positions
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
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по телефону"
            name="phone"
            value={data.phone}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по почте"
            name="email"
            value={data.email}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по адресу объекта"
            name="address"
            value={data.address}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по названию Компании"
            name="company"
            value={data.company}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
        </FieldsContainer>
        <FieldsContainer>
          <SearchDatePicker
            register={register}
            name="startDate"
            label="Добавлены от"
            value={data.startDate}
            onChange={(value) => setValue("startDate", value)}
            disabled={isLoading ? true : false}
          />
          <SearchDatePicker
            register={register}
            name="endDate"
            label="Добавлены до"
            value={data.endDate}
            onChange={(value) => setValue("endDate", value)}
            disabled={isLoading ? true : false}
          />
          <MultiSelectField
            name="users"
            labelId="users-label"
            label="Выбор по позиции"
            itemsList={actualContactPositions}
            selectedItems={data.selectedPositions}
            onChange={(e) => setValue("selectedPositions", e.target.value)}
            disabled={isLoading ? true : false}
          />
        </FieldsContainer>
      </Form>
    );
  }
);

export default ContactsFiltersPanel;
