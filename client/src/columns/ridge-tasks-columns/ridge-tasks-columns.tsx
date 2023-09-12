import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
// components
import RedirectButton from "../../components/common/buttons/redirect-button";
import { FormatManagerName } from "../../components/common/table/helpers/helpers";
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
import DoneStatusIcon from "../../components/common/columns/done-status-icon";
import EmptyTd from "../../components/common/columns/empty-td";
// utils
import { FormatDate } from "../../utils/date/format-date";
import { FormatTime } from "../../utils/date/format-time";
// styled
import { AlignCenter } from "../../components/common/columns/styled";
// store
import { getRidgeObjectById } from "../../store/ridge-object/ridge-objects.store";
import {
  loadUpdateRidgeObjectOpenState,
  setUpdateRidgeObjectId,
  setUpdateRidgeObjectOpenState,
} from "../../store/ridge-object/update-ridge-object.store";
import {
  setUpdateRidgeTaskId,
  setUpdateRidgeTaskOpenState,
} from "../../store/ridge-task/update-ridge-task.store";

export const ridgeTasksColumns = [
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
      const objectId = info?.getValue();
      const isRidgePage = useSelector(loadUpdateRidgeObjectOpenState());
      const object = useSelector(getRidgeObjectById(objectId));
      const fullAddress = `${object?.location?.city}, ${object?.location?.address}`;

      const handleClick = () => {
        dispatch(setUpdateRidgeObjectId(objectId));
        dispatch(setUpdateRidgeObjectOpenState(true));
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
              {!isRidgePage ? (
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
      return <AlignCenter>{FormatManagerName(userId)}</AlignCenter>;
    },
  },
  {
    accessorKey: "managerId",
    header: "Ответственный",
    cell: (info) => {
      const managerId = info.getValue();
      return (
        <AlignCenter>
          {managerId ? FormatManagerName(managerId) : <EmptyTd />}
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
      const handleUpdateRidgeTask = () => {
        dispatch(setUpdateRidgeTaskId(taskId));
        dispatch(setUpdateRidgeTaskOpenState(true));
      };
      return (
        <MultiColorContainedButton
          text="Править"
          onClick={handleUpdateRidgeTask}
          fontColor="white"
          background="darkGreen"
          backgroudHover="forestGreen"
        />
      );
    },
  },
];
