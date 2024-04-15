import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
// components
import EmptyTd from "@components/common/columns/empty-td";
import { AlignCenter } from "@components/common/columns/styled";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import DoneStatusIcon from "@components/common/columns/done-status-icon";
import OpenPageElementIconButton from "@components/common/buttons/icons buttons/open-page-element.button-icon";
// store
import { getObjectById } from "@store/object/objects.store";
import { getTaskById } from "@store/task/tasks.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";
// utils
import { FormatDate } from "@utils/date/format-date";
import { FormatTime } from "@utils/date/format-time";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

export const tasksColumns = (setState, isCurrentUserRoleManager) => {
  let columns = [];

  const {
    handleOpenUpdateMyTaskPage,
    handleOpenUpdateManagerTaskPage,
    handleOpenObjectPage
  } = useDialogHandlers(setState);

  const dateColumn = {
    header: "Дата и время выполнения задачи",
    columns: [
      {
        accessorKey: "isDone",
        header: "",
        enableSorting: false,
        cell: (info) => {
          const isDone = info.getValue();
          return <DoneStatusIcon isDone={isDone} />;
        }
      },
      {
        accessorKey: "date",
        header: "Дата",
        enableSorting: false,
        cell: (info) => {
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
        cell: (info) => {
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
        cell: (info) => {
          const objectId = info.getValue();
          const object = useSelector(getObjectById(objectId));
          const fullAddress = `${object?.city}, ${object?.address}`;

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              {objectId ? (
                <>
                  {fullAddress}d
                  <OpenPageElementIconButton
                    title="Открыть объект"
                    height="20px"
                    heightButton="20px"
                    width="20px"
                    onClick={() => handleOpenObjectPage(objectId)}
                  />
                </>
              ) : (
                <EmptyTd />
              )}
            </Box>
          );
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
        cell: (info) => {
          const comment = info.getValue();
          return <AlignCenter>{comment}</AlignCenter>;
        }
      },
      {
        accessorKey: "userId",
        header: "Задачу поставил",
        enableSorting: false,
        cell: (info) => {
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
        accessorFn: (row) => row,
        header: "Ответственный",
        enableSorting: false,
        cell: (info) => {
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
        cell: (info) => {
          const comment = info.getValue();
          return comment ? <AlignCenter>{comment}</AlignCenter> : <EmptyTd />;
        }
      },
      {
        accessorKey: "created_at",
        header: "Дата постановки задачи",
        enableSorting: false,
        cell: (info) => {
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
        accessorFn: (row) => row,
        header: "Править",
        enableSorting: false,
        cell: (info) => {
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
    columns = [dateColumn, taskObjectColumn, otherColumns];
  } else {
    columns = [dateColumn, taskObjectColumn, otherColumns];
  }

  columns.push(updateColumn);

  return columns;
};
