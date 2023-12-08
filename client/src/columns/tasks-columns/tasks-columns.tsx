import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useDispatch, useSelector } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
// components
import RedirectButton from "../../components/common/buttons/redirect-button";
import EmptyTd from "../../components/common/columns/empty-td";
import { FormatManagerName } from "../../components/common/table/helpers/helpers";
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
import DoneStatusIcon from "../../components/common/columns/done-status-icon";
// store
import { getObjectById } from "../../store/object/objects.store";
import {
  setUpdateMyTaskId,
  setUpdateMyTaskOpenState,
} from "../../store/task/update-my-task.store";
import { getTaskById } from "../../store/task/tasks.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
} from "../../store/user/users.store";
import {
  setUpdateManagerTaskId,
  setUpdateManagerTaskOpenState,
} from "../../store/task/update-manager-task.store";
import {
  getOpenObjectPageOpenState,
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../store/object/open-object-page.store";
// utils
import { FormatDate } from "../../utils/date/format-date";
import { FormatTime } from "../../utils/date/format-time";
// styled
import { AlignCenter } from "../../components/common/columns/styled";
import UserNameWithAvatar from "../../components/common/table/helpers/user-name-with-avatar";
import useGetUserAvatar from "../../hooks/user/use-get-user-avatar";

export const tasksColumns = [
  {
    accessorKey: "isDone",
    header: "",
    enableSorting: false,
    cell: (info) => {
      const isDone = info.getValue();
      return <DoneStatusIcon isDone={isDone} />;
    },
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
    },
  },
  {
    accessorKey: "time",
    header: "Время",
    enableSorting: false,
    cell: (info) => {
      const time = info.getValue();
      return <AlignCenter>{FormatTime(time)}</AlignCenter>;
    },
  },
  {
    accessorKey: "objectId",
    header: "Объект задачи",
    cell: (info) => {
      const dispatch = useDispatch();
      const objectId = info.getValue();
      const isObjectPage = useSelector(getOpenObjectPageOpenState());
      const object = useSelector(getObjectById(objectId));
      const fullAddress = `${object?.location.city}, ${object?.location.address}`;

      const handleClick = () => {
        dispatch<any>(setOpenObjectPageId(objectId));
        dispatch<any>(setOpenObjectPageOpenState(true));
      };

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {objectId ? (
            <>
              {fullAddress}
              {!isObjectPage ? (
                <RedirectButton
                  text="Открыть"
                  color="neutral"
                  onClick={handleClick}
                />
              ) : null}
            </>
          ) : (
            <EmptyTd />
          )}
        </Box>
      );
    },
  },
  {
    accessorKey: "userId",
    header: "Задачу поставил",
    cell: (info) => {
      const userId = info.getValue();
      const getAvatarSrc = () => {
        const { avatarSrc, isLoading } = useGetUserAvatar(userId);
        return isLoading ? null : avatarSrc;
      };
      return (
        <AlignCenter>
          <UserNameWithAvatar userId={userId} avatarSrc={getAvatarSrc()} isLoading={isLoading}/>
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "managerId",
    header: "Ответственный",
    cell: (info) => {
      const managerId = info.getValue();
      const getAvatarSrc = () => useGetUserAvatar(managerId);
      return (
        <AlignCenter>
          {managerId ? (
            <UserNameWithAvatar userId={managerId} avatarSrc={getAvatarSrc()} isLoading={isLoading}/>
          ) : (
            <EmptyTd />
          )}
        </AlignCenter>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Задача",
    cell: (info) => {
      const comment = info.getValue();
      return comment;
    },
  },
  {
    accessorKey: "result",
    header: "Результат",
    cell: (info) => {
      const comment = info.getValue();
      return comment ? comment : <EmptyTd />;
    },
  },
  {
    accessorKey: "created_at",
    header: "Дата создания",
    cell: (info) => {
      const date = info?.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    },
  },
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      const dispatch = useDispatch();
      const taskId = info.getValue();
      const task = useSelector(getTaskById(taskId));
      const currentUserId = useSelector(getCurrentUserId());
      const isCuratorTask = Boolean(task?.managerId);

      const isAuthorEntity = useSelector(
        getIsUserAuthorThisEntity(currentUserId, task)
      );

      const disable = !isCuratorTask && !isAuthorEntity;

      const handleClick = () => {
        if (isCuratorTask) {
          dispatch<any>(setUpdateManagerTaskOpenState(true));
          dispatch<any>(setUpdateManagerTaskId(taskId));
        } else {
          dispatch<any>(setUpdateMyTaskId(taskId));
          dispatch<any>(setUpdateMyTaskOpenState(true));
        }
      };

      return (
        <MultiColorContainedButton
          text="Править"
          onClick={handleClick}
          disabled={disable}
          fontColor={isCuratorTask ? "inherit" : "black"}
          background={isCuratorTask ? "crimson" : "orange"}
          backgroudHover={isCuratorTask ? "darkRed" : "darkOrange"}
        />
      );
    },
  },
];
