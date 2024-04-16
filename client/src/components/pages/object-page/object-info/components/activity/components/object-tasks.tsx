import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import BasicTable from "@common/table/basic-table";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import RowTitle from "@components/common/titles/row-title";
// utils
import sortingByDateAndTime from "@utils/other/sorting-by-date-and-time";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import {
  getObjectTasksList,
  getTaskLoadingStatus
} from "@store/task/tasks.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleCurator,
  getIsUserAuthorThisEntity,
  getIsUserObserver
} from "@store/user/users.store";

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

const ObjectTasks = ({ object, setState, columns }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const objectId = object?._id;

  const tasks = useSelector(getObjectTasksList(objectId));
  const sortedTasks = sortingByDateAndTime(tasks);

  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const isObjectAuthorObserver = useSelector(getIsUserObserver(object?.userId));
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, object)
  );

  const { handleOpenCreateMyTaskPage, handleOpenCreateManagerTaskPage } =
    useDialogHandlers(setState);

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
        ) : (
          isCurrentUserRoleCurator &&
          !isObjectAuthorObserver && (
            <ButtonStyled
              title="Поставить менеджеру задачу"
              style="MANAGER_TASK"
              variant="contained"
              width="260px"
              onClick={() => handleOpenCreateManagerTaskPage(objectId)}
            />
          )
        )}
      </Container>

      {sortedTasks?.length ? (
        <BasicTable
          items={sortedTasks}
          itemsColumns={columns}
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
