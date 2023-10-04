// components
import SearchField from "../../common/inputs/search-field";
import SearchSwitch from "../../common/inputs/search-switch";
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
import SearchSelectField from "../../common/inputs/search-select-field";
// mock
import { taskDoneTypes } from "../../../mock/task-done-status";

const TasksFiltersPanel = ({
  data,
  register,
  setValue,
  isLoading,
}) => {
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
          itemsList={taskDoneTypes}
          value={data.selectedTaskTypes}
          disabled={isLoading ? true : false}
        />
      <SearchSwitch
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

export default TasksFiltersPanel;
