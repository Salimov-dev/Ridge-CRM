import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
import { Dispatch, SetStateAction } from "react";
import { Row } from "react-table";
// mui
import { Box, Typography } from "@mui/material";
// styled
import { AlignCenter } from "@styled/styled-columns";
// components
import EmptyTd from "@components/common/columns/empty-td";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import DoneStatusIcon from "@components/common/columns/done-status-icon";
import ObjectTableEntity from "@components/common/table-entities/object/object.table-entity";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// utils
import { FormatDate } from "@utils/date/format-date";
import { FormatTime } from "@utils/date/format-time";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// store
import { getObjectById } from "@store/object/objects.store";
import { getTaskById } from "@store/task/tasks.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";
import tasksDialogsState from "@dialogs/dialog-handlers/tasks.dialog-handlers";

interface MeetingsColumnsProps {
  state: IDialogPagesState;
  isCurrentUserRoleManager: boolean;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

export const tasksColumns = ({
  state,
  setState,
  isCurrentUserRoleManager
}: MeetingsColumnsProps) => {
  let columns = [];
  const isObjectPage = state?.objectPage;

  const { handleOpenUpdateMyTaskPage, handleOpenUpdateManagerTaskPage } =
    tasksDialogsState({ setState });

  const dateColumn = {
    header: "Дата и время выполнения задачи",
    columns: [
      {
        accessorKey: "isDone",
        header: "",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const isDone = info.getValue();
          return <DoneStatusIcon isDone={isDone} />;
        }
      },
      {
        accessorKey: "date",
        header: "Дата",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const date = info.getValue();
          const formattedDate = FormatDate(date);
          const dayOfWeek = dayjs(date).locale("ru").format("dd");
          return (
            <Box sx={{ display: "flex", justifyContent: "center", gap: "6px" }}>
              <Typography>{formattedDate}</Typography>
              <Typography>{dayOfWeek}</Typography>{" "}
            </Box>
          );
        }
      },
      {
        accessorKey: "time",
        header: "Время",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const time = info.getValue();
          return <AlignCenter>{FormatTime(time)}</AlignCenter>;
        }
      }
    ]
  };

  const taskObjectColumn = {
    header: "Объект задачи",
    columns: [
      {
        accessorKey: "objectId",
        header: "Объект",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const objectId = info.getValue();
          const object = useSelector(getObjectById(objectId));

          return <ObjectTableEntity object={object} setState={setState} />;
        }
      }
    ]
  };

  const otherColumns = {
    header: "Задача",
    columns: [
      {
        accessorKey: "comment",
        header: "Задача",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const comment = info.getValue();
          return <AlignCenter>{comment}</AlignCenter>;
        }
      },
      {
        accessorKey: "userId",
        header: "Задачу поставил",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const userId = info.getValue();
          const { getAvatarSrc, isLoading } = useGetUserAvatar(userId);

          return (
            <AlignCenter>
              <UserNameWithAvatar
                userId={userId}
                avatarSrc={getAvatarSrc()}
                isLoading={isLoading}
              />
            </AlignCenter>
          );
        }
      },
      {
        accessorFn: (row: Row) => row,
        header: "Ответственный",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const row = info.getValue();
          const managerId = row.managerId;
          const userId = row.userId;
          const {
            getAvatarSrc: getManagerAvatar,
            isLoading: isLoadingManager
          } = useGetUserAvatar(managerId);
          const { getAvatarSrc: getUserAvatar, isLoading: isLoadingUser } =
            useGetUserAvatar(userId);

          return (
            <AlignCenter>
              {managerId ? (
                <UserNameWithAvatar
                  userId={managerId}
                  avatarSrc={getManagerAvatar()}
                  isLoading={isLoadingManager}
                />
              ) : (
                <UserNameWithAvatar
                  userId={userId}
                  avatarSrc={getUserAvatar()}
                  isLoading={isLoadingUser}
                />
              )}
            </AlignCenter>
          );
        }
      },
      {
        accessorKey: "result",
        header: "Результат",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const comment = info.getValue();
          return comment ? <AlignCenter>{comment}</AlignCenter> : <EmptyTd />;
        }
      },
      {
        accessorKey: "created_at",
        header: "Дата постановки задачи",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const date = info.getValue();
          return <AlignCenter>{FormatDate(date)}</AlignCenter>;
        }
      }
    ]
  };

  const updateColumn = {
    header: "Задача",
    columns: [
      {
        accessorFn: (row: Row) => row,
        header: "Править",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const row = info.getValue();
          const taskId = row._id;
          const task = useSelector(getTaskById(taskId));
          const currentUserId = useSelector(getCurrentUserId());
          const isCuratorTask = Boolean(task?.managerId);
          const isCallTask = row.isCallTask;

          const isAuthorEntity = useSelector(
            getIsUserAuthorThisEntity(currentUserId, task)
          );

          const disabled = !isCuratorTask && !isAuthorEntity;

          return isCuratorTask ? (
            <AlignCenter>
              <ButtonStyled
                title="Править"
                style="MANAGER_TASK"
                disabled={disabled}
                onClick={() => handleOpenUpdateManagerTaskPage(taskId)}
              />
            </AlignCenter>
          ) : (
            <AlignCenter>
              <ButtonStyled
                title="Править"
                style={isCallTask ? "OBJECT" : "MY_TASK"}
                disabled={disabled}
                onClick={() => handleOpenUpdateMyTaskPage(taskId)}
              />
            </AlignCenter>
          );
        }
      }
    ]
  };

  if (!isCurrentUserRoleManager) {
    columns = [dateColumn, otherColumns];
  } else {
    columns = [dateColumn, otherColumns];
  }

  if (!isObjectPage) {
    columns.splice(3, 0, taskObjectColumn);
  }

  columns.push(updateColumn);

  return columns;
};
