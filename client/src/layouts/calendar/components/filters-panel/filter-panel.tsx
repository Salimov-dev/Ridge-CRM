import { useSelector } from "react-redux";
import { orderBy } from "lodash";
import { Box, styled } from "@mui/material";
import SearchField from "../../../../components/common/inputs/search-field";
import SimpleSelectField from "../../../../components/common/inputs/simple-select-field";
import SearchSwitch from "../../../../components/common/inputs/search-switch";
import { taskTypeArray } from "../../../../mock/task-type";

const Form = styled(`form`)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: "10px",
  gap: "12px",
});

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
`;

const FilterPanel = ({ data, register, setValue, isLoading }) => {
  // const meetings = useSelector(getMeetingsList());
  // const users = useSelector(getUsersList());
  // const statuses = useSelector(getMeetingStatusesList());
  // const types = useSelector(getMeetingTypesList());

  const handleKeyDown = (e) => {
    const keyValue = e.key;
    const isRussianLetter = /^[А-ЯЁа-яё]$/.test(keyValue);
    const isDigit = /^\d$/.test(keyValue);
    const isBackspace = e.keyCode === 8;

    if (!isRussianLetter && !isDigit && !isBackspace) {
      e.preventDefault();
    }
  };

  // const getActualUsersList = () => {
  //   const filteredUsers = meetings?.map((meet) => meet?.userId);
  //   const formatedUsersArray = filteredUsers?.filter((user) => user !== "");

  //   const uniqueUsers = [...new Set(formatedUsersArray)];

  //   const actualUsersArray = uniqueUsers?.map((id) => {
  //     const foundObject = users?.find((user) => user._id === id);
  //     return foundObject
  //       ? {
  //           _id: foundObject._id,
  //           name: `${foundObject.name.lastName} ${foundObject.name.firstName}`,
  //         }
  //       : null;
  //   });

  //   const sortedUsers = orderBy(actualUsersArray, ["name"], ["asc"]);

  //   return sortedUsers;
  // };

  // const getActualStatusesList = () => {
  //   const filteredStatuses = meetings?.map((meet) => meet?.status);
  //   const formatedStatusesArray = filteredStatuses?.filter(
  //     (status) => status !== ""
  //   );

  //   const uniqueStatuses = [...new Set(formatedStatusesArray)];

  //   const actualStatusesArray = uniqueStatuses?.map((id) => {
  //     const foundObject = statuses?.find((status) => status._id === id);
  //     return foundObject
  //       ? {
  //           _id: foundObject._id,
  //           name: foundObject.name,
  //         }
  //       : null;
  //   });

  //   const sortedStatuses = orderBy(actualStatusesArray, ["name"], ["asc"]);

  //   return sortedStatuses;
  // };

  // const getActuaTypesList = () => {
  //   const filteredTypes = meetings?.map((meet) => meet?.meetingType);
  //   const formatedTypesArray = filteredTypes?.filter((type) => type !== "");
  //   const uniqueTypes = [...new Set(formatedTypesArray)];

  //   const actualTypesArray = uniqueTypes?.map((id) => {
  //     const foundObject = types?.find((type) => type._id === id);
  //     return foundObject
  //       ? {
  //           _id: foundObject._id,
  //           name: foundObject.name,
  //         }
  //       : null;
  //   });

  //   const sortedTypes = orderBy(actualTypesArray, ["name"], ["asc"]);

  //   return sortedTypes;
  // };
  return (
    <Form>
      <FieldsContainer>
        <SearchField
          register={register}
          label="Найти по объекту"
          name="object"
          // onKeyDown={handleKeyDown}
          // value={data.object}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <SearchField
          register={register}
          label="Найти по задаче"
          name="task"
          onKeyDown={handleKeyDown}
          value={data.task}
          inputProps={{ maxLength: 30 }}
          disabled={isLoading ? true : false}
        />
        <SimpleSelectField
          register={register}
          itemsList={taskTypeArray}
          selectedItems={data.selectedTaskTypes}
          name="selectedTaskTypes"
          labelId="selectedTaskTypes"
          label="Тип задачи"
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

export default FilterPanel;
