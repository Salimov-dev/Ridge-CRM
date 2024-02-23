// components
import SearchField from "@common/inputs/search-field";
import { FieldsContainer, Form } from "@components/common/forms/styled";
import SearchSelectField from "@common/inputs/search-select-field";
import React from "react";

const ContactsFiltersPanel = React.memo(
  ({ data, register, setValue, isLoading }) => {
    return (
      <Form>
        <FieldsContainer>
          <SearchField
            register={register}
            label="Найти по задаче"
            name="task"
            value={data.task}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по результату"
            name="result"
            value={data.result}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchSelectField
            name="selectedTaskTypes"
            labelId="selectedTaskTypes"
            label="Выбрать по выполнению"
            register={register}
            // itemsList={taskDoneTypes}
            value={data.selectedTaskTypes}
            disabled={isLoading ? true : false}
          />
        </FieldsContainer>
      </Form>
    );
  }
);

export default ContactsFiltersPanel;
