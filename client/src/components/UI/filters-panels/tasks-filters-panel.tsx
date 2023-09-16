import SearchField from "../../common/inputs/search-field";
import SearchSwitch from "../../common/inputs/search-switch";
import { FieldsContainer, Form } from "../../common/forms/styled/styled";
// mock
import { taskDoneTypes } from "../../../mock/task-done-status";
import SearchSelectField from "../../common/inputs/search-select-field";

const TasksFiltersPanel = ({
  data,
  register,
  setValue,
  isLoading,
  isRidgeObject,
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
        {!isRidgeObject ?<SearchSwitch
          title="Задачи куратора"
          isLoading={isLoading}
          isChecked={data?.onlyMyTasks}
          whiteSpace="nowrap"
          checked={data?.onlyMyTasks}
          onChange={(e) => {
            setValue("onlyMyTasks", e.target.checked);
          }}
        /> : null}
      </FieldsContainer>
    </Form>
  );
};

export default TasksFiltersPanel;