import SearchField from "../../common/inputs/search-field";
import SimpleSelectField from "../../common/inputs/simple-select-field";
import SearchSwitch from "../../common/inputs/search-switch";
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
// mock
import { taskDoneTypes } from "../../../mock/task-done-status";

const CalendarFiltersPanel = ({ data, register, setValue, isLoading }) => {
  return (
    <Form>
      <FieldsContainer>
        <SearchField
          register={register}
          label="Найти по объекту"
          name="object"
          // value={data.object}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <SearchField
          register={register}
          label="Найти по задаче"
          name="task"
          value={data.task}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <SimpleSelectField
          register={register}
          itemsList={taskDoneTypes}
          selectedItems={data.selectedTaskTypes}
          name="selectedTaskTypes"
          labelId="selectedTaskTypes"
          label="Выбрать по выполнению"
          value={data.selectedTaskTypes}
          disabled={isLoading ? true : false}
        />
        <SearchSwitch
          data={data}
          title="Задачи куратора"
          isLoading={isLoading}
          isChecked={data?.onlyMyTasks}
          whiteSpace="nowrap"
          checked={data?.onlyMyTasks}
          onChange={(e) => {
            setValue("onlyMyTasks", e.target.checked);
          }}
        />
      </FieldsContainer>
    </Form>
  );
};

export default CalendarFiltersPanel;
