import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
// components
import EmptyTd from "@components/common/columns/empty-td";
import { AlignCenter } from "@components/common/columns/styled";
import UserNameWithAvatar from "@components/common/user-name-with-avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import DoneStatusIcon from "@components/common/columns/done-status-icon";
// store
import { getObjectById } from "@store/object/objects.store";
import { getTaskById } from "@store/task/tasks.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getUsersLoadingStatus
} from "@store/user/users.store";
// utils
import { FormatDate } from "@utils/date/format-date";
import { FormatTime } from "@utils/date/format-time";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";

export const tasksColumns = (
  handleOpenUpdateMyTaskPage,
  handleOpenUpdateManagerTaskPage,
  handleOpenObjectPage,
  isDialogPage
) => [
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
  },
  {
    accessorKey: "objectId",
    header: "Объект задачи",
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
              {fullAddress}
              {!isDialogPage ? (
                <AlignCenter>
                  <ButtonStyled
                    title="Открыть"
                    style="OPEN_OBJECT"
                    onClick={() => handleOpenObjectPage(objectId)}
                  />
                </AlignCenter>
              ) : null}
            </>
          ) : (
            <EmptyTd />
          )}
        </Box>
      );
    }
  },
  {
    accessorKey: "userId",
    header: "Задачу поставил",
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
    accessorKey: "managerId",
    header: "Ответственный",
    cell: (info) => {
      const managerId = info.getValue();
      const { getAvatarSrc, isLoading } = useGetUserAvatar(managerId);
      return (
        <AlignCenter>
          {managerId ? (
            <UserNameWithAvatar
              userId={managerId}
              avatarSrc={getAvatarSrc()}
              isLoading={isLoading}
            />
          ) : (
            <EmptyTd />
          )}
        </AlignCenter>
      );
    }
  },
  {
    accessorKey: "comment",
    header: "Задача",
    cell: (info) => {
      const comment = info.getValue();
      return comment;
    }
  },
  {
    accessorKey: "result",
    header: "Результат",
    cell: (info) => {
      const comment = info.getValue();
      return comment ? comment : <EmptyTd />;
    }
  },
  {
    accessorKey: "created_at",
    header: "Дата создания",
    cell: (info) => {
      const date = info?.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    }
  },
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      const taskId = info.getValue();
      const task = useSelector(getTaskById(taskId));
      const currentUserId = useSelector(getCurrentUserId());
      const isCuratorTask = Boolean(task?.managerId);

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
            style="MY_TASK"
            disabled={disabled}
            onClick={() => handleOpenUpdateMyTaskPage(taskId)}
          />
        </AlignCenter>
      );
    }
  }
];
