import { useSelector } from "react-redux";
import React from "react";
// components
import SearchField from "@common/inputs/search-field";
import { FieldsContainer, Form } from "@components/common/forms/styled";
import SearchDatePicker from "@components/common/inputs/search-date-picker";
import MultiSelectField from "@components/common/inputs/multi-select-field";
// utils
import { getActualContactPositionList } from "@utils/actual-items/get-actual-contact-position-list";
// store
import { getContactPositionsList } from "@store/contact/contact-positions.store";
import { getContactsList } from "@store/contact/contact.store";

const ContactsFiltersPanel = React.memo(
  ({ data, register, setValue, isLoading }) => {
    const contacts = useSelector(getContactsList());
    const contactPositions = useSelector(getContactPositionsList());
    const actualContactPositions = getActualContactPositionList(
      contacts,
      contactPositions
    );

    return (
      <Form>
        <FieldsContainer>
          <SearchField
            register={register}
            label="Найти по адресу объекта"
            name="result"
            value={data.result}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по компании"
            name="task"
            value={data.task}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по почте"
            name="result"
            value={data.result}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по телефону"
            name="result"
            value={data.result}
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
            // selectedItems={data.selectedUsers}
            // onChange={(e) => setValue("selectedUsers", e.target.value)}
            disabled={isLoading ? true : false}
          />
        </FieldsContainer>
      </Form>
    );
  }
);

export default ContactsFiltersPanel;
