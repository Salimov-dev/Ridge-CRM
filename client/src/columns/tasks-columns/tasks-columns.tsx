import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useDispatch, useSelector } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
// components
import GoToButton from "../../components/common/buttons/go-to-button";
import { FormatManagerName } from "../../components/common/table/helpers/helpers";
import TableOpenButton from "../../components/common/buttons/table-open-button";
// store
import { getObjectById } from "../../store/object/objects.store";
// utils
import { FormatDate } from "../../utils/date/format-date";
import { FormatTime } from "../../utils/date/format-time";
import {
  setupdateMyTaskId,
  setUpdateMyTaskOpenState,
} from "../../store/task/update-my-task.store";
import { getTaskById } from "../../store/task/tasks.store";
import { getCurrentUserId } from "../../store/user/users.store";
import {
  setUpdateManagerTaskId,
  setUpdateManagerTaskOpenState,
} from "../../store/task/update-manager-task.store";
import {
  loadOpenObjectPageOpenState,
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../store/object/open-object-page.store";

export const tasksColumns = [
  {
    accessorKey: "isDone",
    header: "",
    enableSorting: false,
    cell: (info) => {
      const isDone = info.getValue();
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {!isDone ? (
            <TaskAltOutlinedIcon sx={{ color: "green" }} />
          ) : (
            <DoDisturbAltOutlinedIcon sx={{ color: "Crimson" }} />
          )}
        </Box>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Дата",
    // enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      const formattedDate = FormatDate(date);
      const dayOfWeek = dayjs(date).locale("ru").format("dd");
      return (
        <Typography>{formattedDate}</Typography>
        // <Box sx={{ display: "flex", justifyContent: "center", gap: "6px" }}>
        //   <Typography>{formattedDate}</Typography>
        //   <Typography>{dayOfWeek}</Typography>{" "}
        // </Box>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Время",
    enableSorting: false,
    cell: (info) => {
      const time = info.getValue();
      return (
        <Typography sx={{ textAlign: "center" }}>
          {FormatTime(time)}
        </Typography>
      );
    },
  },
  {
    accessorKey: "objectId",
    header: "Объект задачи",
    cell: (info) => {
      const objectId = info.getValue();
      const object = useSelector(getObjectById(objectId));
      const fullAddress = `${object?.location.city}, ${object?.location.address}`;
      const isObjectPage = useSelector(loadOpenObjectPageOpenState());
      const dispatch = useDispatch();

      const handleClick = () => {
        dispatch(setOpenObjectPageId(objectId));
        dispatch(setOpenObjectPageOpenState(true));
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
                <GoToButton
                  text="Открыть"
                  color="neutral"
                  onClick={handleClick}
                />
              ) : null}
            </>
          ) : (
            "-"
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
      return (
        <Typography sx={{ textAlign: "center" }}>
          {FormatManagerName(userId)}
        </Typography>
      );
    },
  },
  {
    accessorKey: "managerId",
    header: "Ответственный",
    cell: (info) => {
      const managerId = info.getValue();
      return (
        <Typography sx={{ textAlign: "center" }}>
          {managerId ? FormatManagerName(managerId) : "-"}
        </Typography>
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
    accessorKey: "created_at",
    header: "Дата создания",
    cell: (info) => {
      const date = info.getValue();
      return (
        <Typography sx={{ textAlign: "center" }}>
          {FormatDate(date)}
        </Typography>
      );
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
      const isCurrentUserIsCuratorTask = currentUserId !== task?.userId;
      const disable = isCuratorTask && isCurrentUserIsCuratorTask;

      const handleClick = () => {
        if (isCuratorTask) {
          dispatch(setUpdateManagerTaskOpenState(true));
          dispatch(setUpdateManagerTaskId(taskId));
        } else {
          dispatch(setupdateMyTaskId(taskId));
          dispatch(setUpdateMyTaskOpenState(true));
        }
      };

      return (
        <TableOpenButton
          text="Править"
          onClick={handleClick}
          disabled={disable}
          fontColor={isCuratorTask ? "inherit" : "black"}
          background={isCuratorTask ? "Crimson" : "orange"}
          backgroudHover={isCuratorTask ? "darkRed" : "darkOrange"}
        />
      );
    },
  },
];
