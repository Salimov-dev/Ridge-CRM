import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
// components
import BasicTable from "@common/table/basic-table";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import RowTitle from "@components/common/titles/row-title";
// utils
import sortingByDateAndTime from "@utils/sort/sorting-by-date-and-time";
// columns
import { tasksColumns } from "@columns/tasks.columns";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// dialogs
import tasksDialogsState from "@dialogs/dialog-handlers/tasks.dialog-handlers";
import {
  getObjectTasksList,
  getTaskLoadingStatus
} from "@store/task/tasks.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";

interface ObjectTasksProps {
  object: IObject | null;
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ObjectTasks: FC<ObjectTasksProps> = ({
  object,
  setState,
  state
}): JSX.Element => {
  const currentUserId = useSelector(getCurrentUserId());
  const objectId = object?._id;

  const tasks = useSelector(getObjectTasksList(objectId));
  const sortedTasks = sortingByDateAndTime(tasks);

  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, object)
  );

  const { handleOpenCreateMyTaskPage, handleOpenCreateManagerTaskPage } =
    tasksDialogsState({ setState });

  return (
    <Component>
      <Container sx={{ alignItems: "start" }}>
        <RowTitle
          title="Задачи по объекту"
          background="linear-gradient(to right, Orange , OrangeRed)"
          margin="0px 0px -4px 0"
        />
        {isAuthorEntity ? (
          <ButtonStyled
            title="Поставить себе задачу или звонок"
            style="MY_TASK_CALL"
            variant="contained"
            width="330px"
            onClick={() => handleOpenCreateMyTaskPage(objectId)}
          />
        ) : isCurrentUserRoleCurator ? (
          <ButtonStyled
            title="Поставить менеджеру задачу"
            style="MANAGER_TASK"
            variant="contained"
            width="260px"
            onClick={() => handleOpenCreateManagerTaskPage(objectId)}
          />
        ) : null}
      </Container>

      {sortedTasks?.length ? (
        <BasicTable
          items={sortedTasks}
          itemsColumns={tasksColumns({
            state,
            setState,
            isCurrentUserRoleManager
          })}
          isLoading={isTasksLoading}
          isDialogMode={true}
        />
      ) : (
        <Typography sx={{ marginBottom: "20px" }}>Не обнаружены</Typography>
      )}
    </Component>
  );
};

export default ObjectTasks;
