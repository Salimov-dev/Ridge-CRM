import dayjs from "dayjs";
import { useSelector } from "react-redux";
// mui
import { Box, Typography } from "@mui/material";
// components
import DoneStatusIcon from "@components/common/columns/done-status-icon";
import { AlignCenter } from "@components/common/columns/styled";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// utils
import { FormatDate } from "@utils/date/format-date";
import { FormatTime } from "@utils/date/format-time";
// store
import { getObjectById } from "@store/object/objects.store";
import { getMeetingStatusNameById } from "@store/meeting/meeting-status.store";
import { getMeetingTypeNameById } from "@store/meeting/meeting-types.store";
import { getMeetingById } from "@store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
} from "@store/user/users.store";

export const meetingsColumns = (onOpenUpdateMeetingPage, isDialogPage) => [
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
        <Box sx={{ display: "flex", gap: "6px" }}>
          <Typography>{formattedDate}</Typography>
          <Typography>{dayOfWeek}</Typography>
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
    accessorKey: "location",
    header: "Адрес встречи",
    cell: (info) => {
      const location = info.getValue();
      return (
        <Typography>
          {location.city}, {location.address}
        </Typography>
      );
    },
  },
  {
    accessorKey: "meetingType",
    header: "Тип",
    cell: (info) => {
      const type = info.getValue();
      const name = useSelector(getMeetingTypeNameById(type));
      return <AlignCenter>{name}</AlignCenter>;
    },
  },
  {
    accessorKey: "objectId",
    header: "Объект встречи",
    cell: (info) => {
      const objectId = info.getValue();
      const object = useSelector(getObjectById(objectId));
      const fullAddress = `${object?.location.city}, ${object?.location.address}`;

      return objectId ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {fullAddress}
          {!isDialogPage ? (
            <ButtonStyled
              title="Открыть"
              style="OPEN_OBJECT"
              // onClick={onOpenCreateMyTask}
            />
          ) : null}
        </Box>
      ) : (
        <AlignCenter>-</AlignCenter>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: (info) => {
      const status = info.getValue();
      const name = useSelector(getMeetingStatusNameById(status));
      return <AlignCenter>{name}</AlignCenter>;
    },
  },
  {
    accessorKey: "comment",
    header: "Комментарий",
    cell: (info) => {
      const comment = info.getValue();
      return comment;
    },
  },
  {
    accessorKey: "result",
    header: "Результат",
    cell: (info) => {
      const result = info.getValue();
      return result ? result : <AlignCenter>-</AlignCenter>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Дата создания",
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    },
  },
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      const meetingId = info.getValue();
      const meeting = useSelector(getMeetingById(meetingId));
      const currentUserId = useSelector(getCurrentUserId());
      const isAuthorEntity = useSelector(
        getIsUserAuthorThisEntity(currentUserId, meeting)
      );

      return (
        <AlignCenter>
          <ButtonStyled
            title="Править"
            style="MEETING"
            disabled={!isAuthorEntity}
            onClick={() => onOpenUpdateMeetingPage(meetingId)}
          />
        </AlignCenter>
      );
    },
  },
];
